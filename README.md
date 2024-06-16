# esms-api

![](https://img.shields.io/badge/Release-1.0.5-green)

**JavaScript library to send bulk SMS through Dialog ESMS service**

This library will handle single bulk SMS send feature with Dialog ESMS service.

`npm install @eshanchathuranga/esms-api `

## How to work

#### First needs to contact Dialog Axiata PLC to get credentials for the SMS gateway.

> **Note:-** Please contact [**Dialog Axiata PLC**](https://esms.dialog.lk/) in order to obtain following fields.
 

## Usage

**Configuration**

```javascript
//
//Import esms api module
const config = require('@eshanchathuranga/esms-api');

// set configuration
  const configaration = await config(username, password)

//Get return auth data
const authData = configaration.then(data => {
                         console.log(data);
}
//
```
**Create Campaign**
```javascript
//Import module
const {config, createCampaign} = require('@eshanchathuranga/esms-api');

/*
create campaign with numbers
campaignName={string}
mask={string}
numbers={array}
message={string}
/*

const createCamp = await createcampaign(campaignName, mask, numbers, message);

//Get return campaign data
const campaignData = createCamp.then(data => {
                         return data;
}

//
```
**Get campaign List**
```javascript
//Import module
const {config, getList} = require('@eshanchathurang/esms-api')

//Get list
const list = getList()

list.then(data => {
    return data;
}
```
**Send SMS**

```javascript
//Import module
const {config, send} = require('@eshanchathurang/esms-api')

/*Send SMS for created compaign
 compaignId={string}
 paymentType = value- '0' (To main Wallet)
               value- '1' (To add bill)
/*

const sendSMS = await send(campaignId, paymentType);

//Get sending status
const status = sendSMS.then(status => {
      return status;
}

//
```
**Create template**
```javascript
// Import module
const {config, createTemplate} = require('@eshanchathurang/esms-api')
/*
Create a Template
  templateName {string}
  message {string}
/*
const create = createTemplate(templateName, message);

// Get returnning status
create.then(status => {
     return status;
}

//
```
**Get template list**
```javascript
//Import module
const {config, listTemplate} = require('@eshanchathurang/esms-api')

//get templates
const templates = listTemplate()
templates.then(list => {
      return list;
}

//
```
**Error handle**
```javascript
//Use catch promise
.catch(error) {
   throw error
   return error;
}

//
```
   

## Licence

(The MIT License)
Copyright (c) 2024 Eshan Chathuranga
