
const config = {}
/**
 * Function to set configuration variables.
 * @param {string} username The string
 * @param {string} password The string
 */
async function apiConfig(username, password) {
  await fetch("https://esms.dialog.lk/api/v1/user/login", {
        "credentials": "include",
        "headers": {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; rv:109.0) Gecko/20100101 Firefox/115.0",
            "Accept": "application/json, text/plain, */*",
            "Accept-Language": "en-US,en;q=0.5",
            "RefreshToken": "Bearer undefined",
            "Authorization": "Bearer",
            "RegisterToken": "Bearer",
            "VerifyMobileToken": "Bearer",
            "ChangePasswordToken": "Bearer",
            "AddNewPasswordtoken": "Bearer",
            "AddVerifyNewPasswordtoken": "Bearer",
            "Content-Type": "application/json",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "same-origin"
        },
        "referrer": "https://esms.dialog.lk/login",
        "body": `{\"username\":\"${username}\",\"password\":\"${password}\"}`,
        "method": "POST",
        "mode": "cors"
  })
  .then(responseData => responseData.json()).then(dataRes => {
           if(dataRes.status === 'success') {
                config.token = dataRes.token;
                config.refresh_token = dataRes.refreshToken;
                config.mask = dataRes.userData.fname;
                config.id = dataRes.userData.id;
                config.account_name = dataRes.userData.lname;
                config.mobile_number = dataRes.userData.mobile;
                config.email = dataRes.userData.email;
                config.default_mask = dataRes.userData.defaultMask;
                config.wallet_balance = dataRes.userData.walletBalance;
                config.error_code = dataRes.errCode;
                return
            } else {
                throw new Error(userData.comment);
            }
  });
}

/**
 * Function to set create a campaign variables.
 * @param {string} campaignName The string
 * @param {string} mask The string
 * @param {array} numbers The string
 * @param {string} message The string
 */
async function createCampaign(campaignName, mask, numbers, message) {
    const campConfig = []
    const numbersData = []
    numbers.forEach(element => {
    const array =`{\"mobile\":\"${element}\"}` 
     numbersData.push(array);
    });
    //create Campaign
   await fetch("https://esms.dialog.lk/api/v1/common-campaigns/create-campaign/via-json", {
         "credentials": "include",
         "headers": {
             "User-Agent": "Mozilla/5.0 (Windows NT 10.0; rv:109.0) Gecko/20100101 Firefox/115.0",
             "Accept": "application/json, text/plain, */*",
             "Accept-Language": "en-US,en;q=0.5",
             "RefreshToken": "Bearer ",
             "Authorization": `Bearer ${config.token}`,
             "RegisterToken": `Bearer  `,
             "VerifyMobileToken": "Bearer",
             "ChangePasswordToken": "Bearer",
             "AddNewPasswordtoken": "Bearer",
             "AddVerifyNewPasswordtoken": "Bearer",
             "Content-Type": "application/json",
             "Sec-Fetch-Dest": "empty",
             "Sec-Fetch-Mode": "cors",
             "Sec-Fetch-Site": "same-origin"
         },
         "referrer": "https://esms.dialog.lk/campaign/create",
         "body": `{\"sourceAddress\":\"${mask}\",\"campaign_name\":\"${campaignName}\",\"is_opt_out_required\":\"0\",\"msisdns\":\"\",\"sampleNumberList\":[${numbersData}],\"scheduleDate\":\"2024-06-10\",\"scheduleTime\":\"04:03:39\",\"message\":\"${message}\",\"schedule_now\":\"1\",\"creator_id\":\"${config.id}\"}`,
         "method": "POST",
         "mode": "cors"
     })
     .then(response => response.json()).then(campData => {
            if (campData.status === 'success'){
               campConfig.campID = campData.campaignId;
               campConfig.camp_status = campData.campaignStatus;
               campConfig.cost = campData.chargeableCost; 
                   //pay Money
                   fetch("https://esms.dialog.lk/api/v1/charge", {
                    "credentials": "include",
                    "headers": {
                        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; rv:109.0) Gecko/20100101 Firefox/115.0",
                        "Accept": "application/json, text/plain, */*",
                        "Accept-Language": "en-US,en;q=0.5",
                        "RefreshToken": "Bearer ",
                        "Authorization": `Bearer ${config.token}`,
                        "RegisterToken": "Bearer",
                        "VerifyMobileToken": "Bearer",
                        "ChangePasswordToken": "Bearer",
                        "AddNewPasswordtoken": "Bearer",
                        "AddVerifyNewPasswordtoken": "Bearer",
                        "Content-Type": "application/json",
                        "Sec-Fetch-Dest": "empty",
                        "Sec-Fetch-Mode": "cors",
                        "Sec-Fetch-Site": "same-origin"
                    },
                    "referrer": "https://esms.dialog.lk/campaign/create",
                    "body": `{\"campaignId\":${campConfig.campID},\"paymentType\":0,\"type\":0,\"value\":0}`,
                    "method": "POST",
                    "mode": "cors"
                }).then(data => data.json()).then(tatus => {
                  console.log(tatus);
                })
            }else {
                throw new Error('Campaign Create unsuccsessfull')
            }

        })   
 }
/**
 * Function to set create a campaign variables.
 * @param {string} amount The string
 *  @param {string} paymentType The string
 */
async function charge(amount, paymentType){
    await fetch("https://esms.dialog.lk/api/v1/charge", {
    "credentials": "include",
    "headers": {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; rv:109.0) Gecko/20100101 Firefox/115.0",
        "Accept": "application/json, text/plain, */*",
        "Accept-Language": "en-US,en;q=0.5",
        "RefreshToken": `Bearer ${config.refresh_token}`,
        "Authorization": `Bearer ${config.token} `,
        "RegisterToken": "Bearer",
        "VerifyMobileToken": "Bearer",
        "ChangePasswordToken": "Bearer",
        "AddNewPasswordtoken": "Bearer",
        "AddVerifyNewPasswordtoken": "Bearer",
        "Content-Type": "application/json",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin"
    },
    "referrer": "https://esms.dialog.lk/user/dashboard",
    "body": `{\"userId\":0,\"paymentType\":${paymentType},\"type\":1,\"value\":\"${amount}\"}`,
    "method": "POST",
    "mode": "cors"
}).then(data => data.json()).then(data => {
        if(data.status === 'success') {
             console.log(data.status);
        } else {
            throw new Error (data.comment);
        }
})
}

async function getCampaignList() {
    try {
        const response = await fetch("https://esms.dialog.lk/api/v1/campaignProvision/campaignList?currentPage=1&postsPerPage=5&campaignType=ALL", {
            "credentials": "include",
            "headers": {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; rv:109.0) Gecko/20100101 Firefox/115.0",
                "Accept": "application/json, text/plain, */*",
                "Accept-Language": "en-US,en;q=0.5",
                "RefreshToken": `Bearer ${config.refresh_token}`,
                "Authorization": `Bearer ${config.token}`,
                "RegisterToken": "Bearer",
                "VerifyMobileToken": "Bearer",
                "ChangePasswordToken": "Bearer",
                "AddNewPasswordtoken": "Bearer",
                "AddVerifyNewPasswordtoken": "Bearer",
                "Sec-Fetch-Dest": "empty",
                "Sec-Fetch-Mode": "cors",
                "Sec-Fetch-Site": "same-origin"
            },
            "referrer": "https://esms.dialog.lk/campaign/list",
            "method": "GET",
            "mode": "cors"
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.comment}`);
        }

        const data = await response.json();

        return new Promise((resolve, reject) => {
            if (data.status === 'success') {
                resolve(data.campaignList);
            } else {
                reject(data.comment);
            }
        });
    } catch (error) {
        console.error("Error fetching campaign list:", error);
        throw error; // Re-throw the error so it can be caught by the caller
    }
}





 
module.exports = {
    apiConfig,
    createCampaign, 
    charge,
    getCampaignList
}



