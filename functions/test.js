const {adToAction} = require('./index');
const remoteConfig = require('./remoteConfig');
const storageMapping = require('./storageMapping');
const s2sAPI = require('./s2sAPI');
const data = {advertisingId: "bf256fa0-3eed-430c-a1ca-6a4916641836", lat: 0};

async function test () {
    const res = await adToAction(data)
        .catch(error => console.log(error));
    console.log(res);
}

async function rcTest () {
    console.log(await remoteConfig.getAdActionValue());
}

async function storageTest () {
    console.log(await storageMapping.getAdActionValue());
}

async function s2sAPITest () {
    console.log(await s2sAPI.call(data));
}

rcTest();
storageTest();
s2sAPITest();
test();

