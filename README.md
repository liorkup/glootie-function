
  
    
### Install Firebase CLI    
 ```
 bash npm install -g firebase-tools npm i -g firebase-admin
 ```    
   
### Install Project   
```
bash cd  <folder> npm install
 ```   

### Login & select the Firebase project 
```
bash firebase login firebase use --add   
``` 
### Add Oauth2.0 key to access Remote Config    

In Firebase UI: Settings -> Service Accounts -> Generate private key (Node.js)   
  
Save file instead of functions/[serviceAccountKey.json](https://github.com/liorkup/glootie-function/blob/master/functions/serviceAccountKey.json "serviceAccountKey.json")   
    
### Configure S2S API   
 
In the [s2sAPI.js](https://github.com/liorkup/glootie-function/blob/master/functions/s2sAPI.js "s2sAPI.js") file, set your dev_token & link_id values in _params_ object.  
    
### Test locally 

#### Run:

``` 
bash firebase emulators:start --only functions 
``` 

Find the http paths printed to the screen, e.g.: http://localhost:5001/mapps-emea/us-central1/testS2S  
  
#### Call the testS2S, testRC & testAll functions

e.g.:   
  
- http://localhost:5001/mapps-emea/us-central1/testRC   
  - Expected response: The Remote Config object  
  
- http://localhost:5001/mapps-emea/us-central1/testS2S?advertisingId=bf256fa0-3eed-430c-a1ca-6a4916641836&lat=0  
  - Expected response: The S2S call returned object. 
	  - e.g.: ```{"ad_events":[],"errors":[],"attributed":false}``` if not attributed
     
- http://localhost:5001/mapps-emea/us-central1/testAll?advertisingId=bf256fa0-3eed-430c-a1ca-6a4916641836&lat=0  
  - Expected response: The action object: ```{"action":<action name>}```, or, ```{"action":null}``` if not attributed or Remote Config doesn't contains the campaign mapping  

  
  
### Deploy 

```
bash firebase deploy --only functions:googleAdsConversionResult 
```
