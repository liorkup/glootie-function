const remoteConfig = require('./remoteConfig');
const s2sAPI = require('./s2sAPI');

let rcValue;
let s2sResponse;

const MINUTE_IN_MILLI = 1000 * 60;
const TIME_TO_REFRESH_IN_MINUTES = 60;

let lastUpdate;
let count = 0;
let EMPTY_RES = {action : null};

const isHourFromLastUpdate = () =>
    (new Date().getTime() - lastUpdate.getTime()) / MINUTE_IN_MILLI >= TIME_TO_REFRESH_IN_MINUTES;

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

module.exports = adToAction;


