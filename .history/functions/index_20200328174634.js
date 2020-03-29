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
const axios = require('axios');
const qs = require('qs');
admin.initializeApp();

exports.googleAdsConversionResult = functions.https.onCall((data) => {

    const advertisingId = data.advertisingId;
    const timestamp = Math.floor(new Date() / 1000);

    if (!advertisingId) {
    // Throwing an HttpsError so that the client gets the error details.
    throw new functions.https.HttpsError('invalid-argument', 'The function must be called with ' +
        'a valid advertisingId');
    }

    const api = 'https://www.googleadservices.com/pagead/conversion/app/1.0?';

    const params = {
        rdid : advertisingId,
        timestamp : timestamp,
        dev_token : "0TMeIjcYszPrTnQaBn_r_Q",
        link_id : 'FEB5615B16A3F3E6E97D44ED7BD967B4', //todo: - linkid of my app
        app_event_type : "custom",
        app_event_name: "ddl_action",
        id_type : "advertisingid",
        lat : 0,
        app_version : 1,
        os_version : 1,
        sdk_version : 1
    };

    // axios.interceptors.request.use(request => {
    //     console.log('Starting Request', request)
    //     return request
    //   })

    
    let res = 

});

async function callAPI() {
    return axios.post(api.concat(qs.stringify(params)))
        .catch(error => console.log(error));
}


exports.addNumbers = functions.https.onCall((data) => {

  const firstNumber = data.firstNumber;
  const secondNumber = data.secondNumber;

  if (!Number.isFinite(firstNumber) || !Number.isFinite(secondNumber)) {

    throw new functions.https.HttpsError('invalid-argument', 'The function must be called with ' +
        'two arguments "firstNumber" and "secondNumber" which must both be numbers.');
  }

  return {
    firstNumber: firstNumber,
    secondNumber: secondNumber,
    operator: '+',
    operationResult: firstNumber + secondNumber,
  };

});

