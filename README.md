
  
    
### Install Firebase CLI    
 ```bash 
npm install -g firebase-tools npm i -g firebase-admin
 ```    
   
### Install Project   
```bash 
cd  <main folder>
npm install
cd functions
npm install
cd ..
 ```   

### Login & select the Firebase project 
```bash 
firebase login firebase use --add   
``` 
### Configure Remote Config access   

- Generate Oauth2.0 key : In Firebase UI: Settings -> Service Accounts -> Generate private key (Node.js)   
  
- Save file as \<main folder\>/functions/[serviceAccountKey.json](https://github.com/liorkup/glootie-function/blob/master/functions/serviceAccountKey.json "serviceAccountKey.json")   

- Set your Firebase Project Id under _PROJECT_ID_ param in remoteConfig.js (Firebase Project Id is located in: Settings -> General)
    
### Configure S2S API access   
 
In the [s2sAPI.js](https://github.com/liorkup/glootie-function/blob/master/functions/s2sAPI.js "s2sAPI.js") file, set your _dev_token_ & _link_id_ values in _params_ object.  
    
### Test locally 

```bash 
npm test
``` 

### Test as functions 

#### Run:

```bash 
firebase emulators:start --only functions 
``` 

Find the http paths printed to the screen, e.g.: http://localhost:5001/mapps-emea/us-central1/testS2S  
  
#### Call the testS2S, testRC & testAllMock functions

e.g.:   
  
- http://localhost:5001/mapps-emea/us-central1/testRC   
  - Expected response: The Remote Config object  
  
- http://localhost:5001/mapps-emea/us-central1/testS2S?advertisingId=bf256fa0-3eed-430c-a1ca-6a4916641836&lat=0  
  - Expected response: The S2S call returned object. 
	  - e.g.: ```{"ad_events":[],"errors":[],"attributed":false}``` if not attributed
     
- http://localhost:5001/mapps-emea/us-central1/testAllMock?advertisingId=bf256fa0-3eed-430c-a1ca-6a4916641836&lat=0  
  - Expected response: The action object: ```{"action":<action name>}```, or, ```{"action":null}``` in case your Remote Config mapping doesn't contains the campaignId '123456789' from the S2Smock   

  
  
### Deploy 

```bash 
firebase deploy --only functions:adToAction,functions:adToActionMock 
```
