const adToAction = require('./adToAction');

async function test () {
    const res = await adToAction({advertisingId: "bf256fa0-3eed-430c-a1ca-6a4916641836", lat: 0})
        .catch(error => console.log(error));
    console.log(res);
}

test();