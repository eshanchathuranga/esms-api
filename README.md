# dialog-esms-api

![](https://img.shields.io/badge/Release-1.0.1-green)

**JavaScript library to send bulk SMS through Dialog ESMS service**

This library will handle single bulk SMS send feature with Dialog ESMS service.

`npm install dialog-sms-service `

## How to work

#### First needs to contact Dialog Axiata PLC to get credentials for the SMS gateway.

> **Note:-** Please contact [**Dialog Axiata PLC**](https://esms.dialog.lk/) in order to obtain following fields.
 

## Usage

**Configuration**

```javascript
//Import esms api module
const apiConfig = require('@eshanchathuranga/esms-api');
// set configuration
  async function config() {
        await apiConfig(username, password)
}
```

**Send SMS**

```javascript
await createCampaign(campaignName, mask, numbers, message)
// campaignName -- {string}
// mask -- {string}
// numbers -- {array}
// Message -- {string}
```

## Licence

(The MIT License)
Copyright (c) 2024 Eshan Chathuranga
