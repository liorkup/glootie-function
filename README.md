
### Install Firebase CLI

```bash
npm install -g firebase-tools
npm i -g firebase-admin
```


### Login to Firebase project
```bash
firebase login
```
### Create Project
#### New Project
Create an empty folder
```bash
firebase init 
```
#### Existing Project
```bash
cd  <folder>
npm install
firebase use --add
```
### Write the function
In: index.js
### test locally
```bash
firebase serve --only hosting,functions
```
### Deploy
```bash
cd functions && npm install; cd ..
firebase deploy --only functions:googleAdsConversionResult
```