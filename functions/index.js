/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const mappingService = require('./remoteConfig');
const s2sAPI = require('./s2sAPI');
const s2sMock = require('./s2sMock');

const MINUTE_IN_MILLI = 1000 * 60;
const TIME_TO_REFRESH_IN_MINUTES = 5;

let mapping;
let lastUpdate;
const EMPTY_RES = {campaignId: null, adGroupId: null, action : null, timestamp: null};


const isHourFromLastUpdate = () =>
    !lastUpdate || (new Date().getTime() - lastUpdate.getTime()) / MINUTE_IN_MILLI >= TIME_TO_REFRESH_IN_MINUTES;

admin.initializeApp();

const getAction = async (data, s2s) => {

    const s2sPromise = s2s.call(data);
    let s2sResponse;
    try {
        if(isHourFromLastUpdate()) {
            let mappingPromise = mappingService.getAdActionValue();
            [s2sResponse, mapping] = await Promise.all([s2sPromise, mappingPromise]);
        } else {
            s2sResponse = await s2sPromise;
        }
    } catch(err) {
        return EMPTY_RES;
    }

    const {ad_group_id, campaign_id, timestamp} = s2sResponse['attributed'] && s2sResponse['ad_events'][0];
    const {adGroupIds, campaignIds} = mapping;
    return !s2sResponse['attributed'] &&  EMPTY_RES ||
        {campaignId: campaign_id,  adGroupId: ad_group_id,
            action : adGroupIds && adGroupIds[ad_group_id] || campaignIds && campaignIds[campaign_id] || null,
            timestamp: timestamp};

};

// Firebase Functions to call from Android/ iOS:

exports.adToAction = functions.https.onCall(async (data) => getAction(data, s2sAPI));

exports.adToActionMock = functions.https.onCall(async (data) => getAction(data, s2sMock));


// Only for tests:

exports.testS2S = functions.https.onRequest((req, res) =>
    s2sAPI.call(req.query)
    .catch(e => res.send("Error"))
    .then(ad => res.send(ad))

);

exports.adToActionTest = getAction;

exports.testRC = functions.https.onRequest((req, res) =>
    mappingService.getAdActionValue()
    .catch(e => res.send("Error"))
    .then(rc => res.send(rc))
);

exports.testAllMock = functions.https.onRequest((req, res) =>
    getAction(null, s2sMock)
                      .catch(e => res.send("Error"))
                      .then(action => res.send(action))

);




