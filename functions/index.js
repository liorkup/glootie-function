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
const remoteConfig = require('./remoteConfig');
const s2sAPI = require('./s2sAPI');

const MINUTE_IN_MILLI = 1000 * 60;
const TIME_TO_REFRESH_IN_MINUTES = 60;

let rcValue;
let s2sResponse;
let lastUpdate;
let EMPTY_RES = {action : null};


const isHourFromLastUpdate = () =>
    (new Date().getTime() - lastUpdate.getTime()) / MINUTE_IN_MILLI >= TIME_TO_REFRESH_IN_MINUTES;

admin.initializeApp();

const adToAction = async (data) => {

    const s2sPromise = s2sAPI.call(data);

    try {
        if(!lastUpdate || isHourFromLastUpdate()) {
            let rcPromise = remoteConfig.getAdActionValue();
            [s2sResponse, rcValue] = await Promise.all([s2sPromise, rcPromise]);
        } else {
            s2sResponse = await s2sPromise;
        }
    } catch(err) {
        return EMPTY_RES;
    }

    const {ad_group_id, campaign_id} = s2sResponse['attributed'] && s2sResponse['ad_events'][0];
    const {adGroupIds, campaignIds} = rcValue;

    return !s2sResponse['attributed'] &&  EMPTY_RES ||
        {action : adGroupIds && adGroupIds[ad_group_id] || campaignIds && campaignIds[campaign_id] || null};

};


exports.googleAdsConversionResult = functions.https.onCall(adToAction);

exports.adToAction = adToAction;

exports.testS2S = functions.https.onRequest((req, res) => {
    s2sAPI.call(req.query)
    .catch(e => res.send("Error"))
    .then(ad => res.send(ad));

});

exports.testRC = functions.https.onRequest((req, res) => {
 remoteConfig.getAdActionValue()
    .catch(e => res.send("Error"))
    .then(rc => res.send(rc));

});

exports.testAll = functions.https.onRequest((req, res) => {
                   adToAction()
                      .catch(e => res.send("Error"))
                      .then(action => res.send(action));

});




