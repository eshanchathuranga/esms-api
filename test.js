const {apiConfig, createCampaign} = require('./index.js')

// apiConfig('eshansky7', 'Eshan@sky7')
// createCampaign('test019', 'Fregg', ['0754718952','0723636800'], 'test#0019')

async function run () {
    try{
        await apiConfig('eshansky7', 'Eshan@sky7')
        await createCampaign('test019', 'Fregg', ['0754718952','0723636800'], 'test#0019')
    } catch(error) {
        console.log(error);
    }
}
run()