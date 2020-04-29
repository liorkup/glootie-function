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
const adToAction = require('./adToAction');
const remoteConfig = require('./remoteConfig');
const s2sAPI = require('./s2sAPI');

admin.initializeApp();

exports.googleAdsConversionResult = functions.https.onCall(adToAction);


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




