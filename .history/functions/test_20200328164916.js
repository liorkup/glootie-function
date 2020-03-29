const axios = require('axios');
const querystring = require('querystring');

const advertisingId = 'bf256fa0-3eed-430c-a1ca-6a4916641836';//data.advertisingId;
const timestamp = Math.floor(new Date() / 1000);

if (!advertisingId) {
// Throwing an HttpsError so that the client gets the error details.
throw new functions.https.HttpsError('invalid-argument', 'The function must be called with ' +
    'a valid advertisingId');
}

const api = 'https://www.googleadservices.com/pagead/conversion/app/1.0/';

const params = {
    rdid : advertisingId,
    timestamp : timestamp,
    dev_token : "0TMeIjcYszPrTnQaBn_r_Q",
    link_id : 'FEB5615B16A3F3E6E97D44ED7BD967B4', //todo
    app_event_type : "custom",
    app_event_name: "ddl_action",
    id_type : "advertisingid",
    lat : 0,
    app_version : 1,
    os_version : 1,
    sdk_version : 1
};



axios.post(api, qs.stringify(params))
    .then(response => {
        console.log(response.data)
        return true;
    })
  .catch(error => {
    console.log(error);
  });