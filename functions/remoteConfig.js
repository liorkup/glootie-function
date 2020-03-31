const {google} = require('googleapis');
const serviceAccount = require("./serviceAccountKey.json");
const axios = require('axios');
const SCOPES = ['https://www.googleapis.com/auth/firebase.remoteconfig'];
const PROJECT_ID = "mapps-emea";
let token = null;

exports.getAdActionValue = async () => {

    const api = 'https://firebaseremoteconfig.googleapis.com/v1/projects/' + PROJECT_ID + '/remoteConfig';

    if(!token) {
        token = await getAccessToken();
    }

    const instance = axios.create();
    const response = instance.request({
        baseURL: api,
        timeout: 3000,
        headers: {'Authorization': 'Bearer ' + token, 'Accept-Encoding': 'gzip'}
    });

    return response.then(res => {
        const parameters = res.data.parameters;
        const value = parameters['ad_to_action'] && parameters['ad_to_action']['defaultValue']['value'];
        return JSON.parse(value);
    });

    function getAccessToken() {
        return new Promise(function (resolve, reject) {
            var key = serviceAccount;
            var jwtClient = new google.auth.JWT(
                key.client_email,
                null,
                key.private_key,
                SCOPES,
                null
            );
            jwtClient.authorize(function (err, tokens) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(tokens.access_token);
            });
        });
    }

};



