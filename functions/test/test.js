const assert = require('assert');
const expect = require('chai').expect;
const should = require('chai').should();
const {adToActionTest} = require('../index');
const remoteConfig = require('../remoteConfig');
const s2sAPI = require('../s2sAPI');
const s2sMock = require('../s2sMock');
const data = {advertisingId: "bf256fa0-3eed-430c-a1ca-6a4916641836", lat: 0};


describe('AdToAction Tests', function() {
    describe('Full flow with mock s2s', function() {
        it('should return -1 when the value is not present', async function() {
            const res = await adToActionTest(data, s2sMock)
                .catch(error => console.log(error));
            expect(res).to.have.all.keys('action', 'adGroupId', 'campaignId');
            assert.notEqual(res.action, null);
        });

    });
    describe('full flow', function() {
        it('should return -1 when the value is not present', async function() {
            const res = await adToActionTest(data, s2sAPI)
                .catch(error => console.log(error));
            expect(res).to.have.all.keys('action', 'adGroupId', 'campaignId');
        });
    });
    describe('Test remote config', function() {
        it('should return -1 when the value is not present', async function() {
            const rcObject = await remoteConfig.getAdActionValue();
            expect(rcObject).to.have.all.keys('adGroupIds', 'campaignIds');
        });
    });
    describe('Test s2s config', function() {
        it('should return -1 when the value is not present', async function() {
            const s2sResponse = await s2sAPI.call(data);
            expect(s2sResponse).to.have.all.keys('ad_events', 'attributed', 'errors');
        });
    });
});


