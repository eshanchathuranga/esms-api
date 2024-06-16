const configData = {};
const campConfigData = {};
/**
 * Function to set configuration variables.
 * @param {string} username The string
 * @param {string} password The string
 */
async function config (username, password) {
    const cnf = await fetch("https://esms.dialog.lk/api/v1/user/login", {
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
    });
    const data = await cnf.json();
    if (!cnf.ok){
    throw new Error(`HTTP error!  Status: ${cnf.status}`);
    }
    return new Promise((resolve, reject) => {
        if (data.status === 'success') {
            configData.id = data.userData.id;
            configData.account_name = data.userData.lname;
            configData.register_mobile = data.userData.mobile;
            configData.email = data.userData.email;
            configData.token = data.token;
            configData.refresh_token = data.refreshToken;
            configData.account_status = data.userData.accountStatus;            
            configData.default_mask = data.userData.defaultMask;
            configData.additional_mask = data.userData.additional_mask;
            configData.wallet_balance = data.userData.walletBalance;
            resolve(configData)
        } else {
            reject(`Erorr getting Auth! Status:${data.comment}`)
        }
    })
}
/**
 * Function to set create a account charging variables.
 * @param {string} amount The string
 *  @param {string} paymentType The string
 */
async function charge (amount, paymentType) {
    const charge = await fetch("https://esms.dialog.lk/api/v1/charge", {
        "credentials": "include",
        "headers": {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; rv:109.0) Gecko/20100101 Firefox/115.0",
            "Accept": "application/json, text/plain, */*",
            "Accept-Language": "en-US,en;q=0.5",
            "RefreshToken": `Bearer ${configData.refresh_token}`,
            "Authorization": `Bearer ${configData.token} `,
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
    });
    const data = await charge.json();
    if (!charge.ok) {
        throw new Error(`HTTP Error!  Status: ${charge.status}`)
    }
    return new Promise ((resolve, reject) => {
        if (data.status === 'success') {
            resolve(data);
        } else {
            reject(`Error charge account! Status: ${data.comment}`)
        }
    })
}
/**
 * Function to set create a campaign variables.
 * @param {string} campaignName The string
 * @param {string} mask The string
 * @param {array} numbers The string
 * @param {string} message The string
 */
async function createCampaign (campaignName, mask, numbers, message) {
    const numbersData = []
    numbers.forEach(element => {
    const array =`{\"mobile\":\"${element}\"}` 
     numbersData.push(array);
    });
    const create = await fetch("https://esms.dialog.lk/api/v1/common-campaigns/create-campaign/via-json", {
        "credentials": "include",
        "headers": {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; rv:109.0) Gecko/20100101 Firefox/115.0",
            "Accept": "application/json, text/plain, */*",
            "Accept-Language": "en-US,en;q=0.5",
            "RefreshToken": "Bearer ",
            "Authorization": `Bearer ${configData.token}`,
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
        "body": `{\"sourceAddress\":\"${mask}\",\"campaign_name\":\"${campaignName}\",\"is_opt_out_required\":\"0\",\"msisdns\":\"\",\"sampleNumberList\":[${numbersData}],\"scheduleDate\":\"2024-06-10\",\"scheduleTime\":\"04:03:39\",\"message\":\"${message}\",\"schedule_now\":\"1\",\"creator_id\":\"${configData.id}\"}`,
        "method": "POST",
        "mode": "cors"
    });
    const data = await create.json();
    if (!create.ok) {
        throw new Error (`HTTP error!  Status: ${create.status}`)
    }
    return new Promise((resolve, reject) => {
        if (data.status === 'success') {
            campConfigData.campaign_ok = data.status;
            campConfigData.campaign_id = data.campaignId;
            campConfigData.campaugn_status = data.campaignStatus;
            campConfigData.campaign_cost = data.chargeableCost;
            resolve(campConfigData);
        } else {
            reject(`Error creating campaign! Status: ${data.comment}`);
        }
    })
}
/**
 * Function to set create a campaign variables.
 * @param {string} campaignId The string
 * @param {string} paymentType The string
 */
async function send (campaignId, paymentType) {
    const sendSMS = await fetch("https://esms.dialog.lk/api/v1/charge", {
        "credentials": "include",
        "headers": {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; rv:109.0) Gecko/20100101 Firefox/115.0",
            "Accept": "application/json, text/plain, */*",
            "Accept-Language": "en-US,en;q=0.5",
            "RefreshToken": `Bearer ${configData.refresh_token}`,
            "Authorization": `Bearer ${configData.token}`,
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
        "body": `{\"campaignId\":${campaignId},\"paymentType\":${paymentType},\"type\":0,\"value\":0}`,
        "method": "POST",
        "mode": "cors"
    });
    const data = await sendSMS.json();
    if (!sendSMS.ok) {
        throw new Error (`HTTP error!  Status: ${sendSMS.status}`)
    }
    return new Promise((resolve, reject) => {
        if (data.status === 'success') {
            resolve(data);
        } else {
            reject(`Error in payment! Status: ${data.comment}`);
        }
    })
}
async function getList () {
    const list = await fetch("https://esms.dialog.lk/api/v1/campaignProvision/campaignList?currentPage=1&postsPerPage=5&campaignType=ALL", {
        "credentials": "include",
        "headers": {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; rv:109.0) Gecko/20100101 Firefox/115.0",
            "Accept": "application/json, text/plain, */*",
            "Accept-Language": "en-US,en;q=0.5",
            "RefreshToken": `Bearer ${configData.refresh_token}`,
            "Authorization": `Bearer ${configData.token}`,
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
    const data = await list.json();
    if (!list.ok) {
        throw new Error (`HTTP error!  Status: ${list.status}`);
    } 
    return new Promise((resolve, reject) => {
        if (data.status === 'success') {
            resolve(data.campaignList);
        } else {
            reject(`Error in getting campaign list!  Status:${data.comment}`);
        }
    })
}
async function listTempalate() {
    const list = await fetch("https://esms.dialog.lk/api/v1/message-template/view-all-templates?currentPage=1&postsPerPage=5", {
        "credentials": "include",
        "headers": {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; rv:109.0) Gecko/20100101 Firefox/115.0",
            "Accept": "application/json, text/plain, */*",
            "Accept-Language": "en-US,en;q=0.5",
            "RefreshToken": `Bearer ${configData.refresh_token}`,
            "Authorization": `Bearer ${configData.token}`,
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
        "referrer": "https://esms.dialog.lk/template/list",
        "body": "{}",
        "method": "POST",
        "mode": "cors"
    });
    const data = await list.json();
    if (!list.ok){
        throw new Error(`HTTP error!  status: ${list.status}`)
    }
    return new Promise((resolve, reject) => {
        if (data.status === 'success') {
            resolve(data.data.data);
        } else {
            reject(`Error in getting template list!  Status: ${data.comment}`)
        }
    })
}
/**
 * Function to set create a template variables.
 * @param {string} templateName The string
 * @param {string} message The string
 */
async function createTemplate(templateName, message) {
     const create = await fetch("https://esms.dialog.lk/api/v1/message-template/create-template", {
        "credentials": "include",
        "headers": {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; rv:109.0) Gecko/20100101 Firefox/115.0",
            "Accept": "application/json, text/plain, */*",
            "Accept-Language": "en-US,en;q=0.5",
            "RefreshToken": `Bearer ${configData.refresh_token}`,
            "Authorization": `Bearer ${configData.token}`,
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
        "referrer": "https://esms.dialog.lk/template/create-list",
        "body": `{\"template_name\":\"${templateName}\",\"message\":\"${message}\"}`,
        "method": "POST",
        "mode": "cors"
    });
    const data = await create.json();
    if (!create.ok) {
        throw new Error (`HTTP error!  Status:${create.status}`);
    }
    return new Promise((resolve, reject) => {
        if (data.status === 'success') {
            resolve(data);
        } else {
            reject(`Error creating template! Status: ${data.comment}`)
        }
    })
}




module.exports = {
    config,
    charge,
    createCampaign,
    send,
    getList,
    listTempalate,
    createTemplate

}
