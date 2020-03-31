const remoteConfig = require('./remoteConfig');
const s2sAPI = require('./s2sTest');

const adToAction = async (data) => {
    const s2sPromise = s2sAPI.call(data);
    const rcPromise = remoteConfig.getAdActionValue();
    let [s2sResponse, rcValue] = await Promise.all([s2sPromise, rcPromise]);

    if(!s2sResponse['attributed']) {
        return null;
    }

    const {ad_group_id, campaign_id} = s2sResponse['ad_events'][0];
    const {adGroupIds, campaignIds} = rcValue;

    return {action : adGroupIds[ad_group_id] || campaignIds[campaign_id] || null};


};

module.exports = adToAction;


