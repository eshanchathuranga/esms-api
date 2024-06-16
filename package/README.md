# esms-api

![](https://img.shields.io/badge/Release-1.0.1-green)

**JavaScript library to send bulk SMS through Dialog ESMS service**

This library will handle bulk SMS send feature with Dialog ESMS service.

`npm install @eshanchathuranga/esms-api `

## How to work

#### First needs to contact Dialog Axiata PLC to get credentials for the SMS gateway.

> **Note:-** Please contact [**Dialog ESMS Service**](https://esms.dialog.lk/) in order to obtain following fields.
 

## Usage

**Configuration**

```javascript
//
// Import esms api module
const config = require('@eshanchathuranga/esms-api/index');

// set configuration
// username - {string} - 'test'
// pssword - {string} - 'test@1234'
const configaration = await config(username, password)

// Get return auth data
const authData = configaration.then(data => {
                         console.log(data);
}
//
```
**Create Campaign**
```javascript
// Import module
const {config, createCampaign} = require('@eshanchathuranga/esms-api/index');


// Create campaign with numbers
// campaignName - {string} - 'test01'
// mask - {string} - 'test'
// numbers - {array} - ['0770000000', '0720000000', '0750000000', '0700000000', '0740000000', '0780000000']
// message - {string} - 'Hello there! This is test massege'


const createCamp = await createcampaign(campaignName, mask, numbers, message);

// Get return campaign data
const campaignData = createCamp.then(data => {
                         return data;
}

//
```
**Get campaign List**
```javascript
// Import module
const {config, getList} = require('@eshanchathurang/esms-api/index');

// Get list
const list = getList().then(data => {
    // List data is here!
    return data;
}
```
**Send SMS**

```javascript
// Import module
const {config, send} = require('@eshanchathurang/esms-api/index');

// Send SMS for created compaign
// compaignId - {string} - '000000'
// paymentType - value='0' (To main Wallet) /   value='1' (To add bill)
               
/*

const sendSMS = await send(campaignId, paymentType);

// Get sending status
const status = sendSMS.then(status => {
      return status;
}

//
```
**Create template**
```javascript
// Import module
const {config, createTemplate} = require('@eshanchathurang/esms-api/index');

// Create a Template
// templateName - {string} - 'test01'
// message - {string} - 'Hello There!'

const create = createTemplate(templateName, message);

// Get returnning status
create.then(status => {
     return status;
}

//
```
**Get template list**
```javascript
// Import module
const {config, listTemplate} = require('@eshanchathurang/esms-api/index');

// get templates
const templates = listTemplate().then(list => {
      // list in here!
      return list;
}

//
```
**Get template Data**
```javascript
// Import module
const {config, getTemplateData} = require('@eshanchathurang/esms-api/index');

// Get Data
const templateData = await getTemplateData(templateId).then(data => {
      // Template data in here!
      return data;
}

//
```
**Get report**
```javascript
// Import module
const {config, getReport} = require('@eshanchathurang/esms-api/index');

// Get report data
// from - {Date} - 'yyyy-mm-dd' / 'yyyy-mm'
// to - {date} - 'yyyy-mm-dd' / 'yyyy-mm'
// option - {option} - 'daily' / 'monthly'
const reportData = await getReport(from, to, option).then(data => {
           // Report data in here!
           return data;
}

//
```




**Error handle**
```javascript
// Use catch promise
.catch(error) {
   throw error
   return error;
}

//
```
   

## Licence

(The MIT License)
Copyright (c) 2024 Eshan Chathuranga
