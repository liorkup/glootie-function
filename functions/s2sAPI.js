const axios = require('axios');
const qs = require('qs');

module.exports.call = async (data) => {

    const advertisingId = data.advertisingId;
    const lat = data.lat || 0;
    const timestamp = Math.floor(new Date() / 1000);

    if (!advertisingId) {
        // Throwing an HttpsError so that the client gets the error details.
        throw new functions.https.HttpsError('invalid-argument', 'The function must be called with ' +
            'a valid advertisingId');
    }

    const api = 'https://www.googleadservices.com/pagead/conversion/app/1.0?';

    const params = {
        rdid: advertisingId,
        timestamp: timestamp,
        dev_token: '123',
        link_id: '123',
        app_event_type: "custom",
        app_event_name: "ddl_action",
        id_type: "advertisingid",
        lat: lat,
        app_version: 1,
        os_version: 1,
        sdk_version: 1
    };

    const url = api.concat(qs.stringify(params));
    const response = await axios.post(url);
    return response.data;

};