# esms-api

![](https://img.shields.io/badge/Release-1.0.1-green)

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
const apiConfig = require('@eshanchathuranga/esms-api');
// set configuration
  async function config() {
        await apiConfig(username, password)
}
//
```

**Send SMS**

```javascript
//
// campaignName -- {string}
// mask -- {string}
// numbers -- {array}
// Message -- {string}
await createCampaign(campaignName, mask, numbers, message)
//
```

## Licence

(The MIT License)
Copyright (c) 2024 Eshan Chathuranga
