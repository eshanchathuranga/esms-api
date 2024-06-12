const {apiConfig, createCampaign} = require('./index.js')
async function run () {
    try{
        await apiConfig('username', 'password')
        await createCampaign('campaignName', 'Mask', [numbers_list], 'messege')
    } catch(error) {
        console.log(error);
    }
}
run()
