const {adToActionTest} = require('./index');
const remoteConfig = require('./remoteConfig');
const s2sAPI = require('./s2sAPI');
const s2sMock = require('./s2sMock');
const data = {advertisingId: "bf256fa0-3eed-430c-a1ca-6a4916641836", lat: 0};

async function testFull (s2s) {
    const res = await adToActionTest(data, s2s)
        .catch(error => console.log(error));
    console.log(res);
}

async function rcTest () {
    console.log(await remoteConfig.getAdActionValue());
}


async function s2sAPITest () {
    console.log(await s2sAPI.call(data));
}

rcTest();
s2sAPITest();
testFull(s2sAPI);
testFull(s2sMock);

