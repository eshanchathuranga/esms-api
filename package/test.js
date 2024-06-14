const {apiConfig, createCampaign, charge, getCampaignList} = require('./index.js')

// apiConfig('eshansky7', 'Eshan@sky7')
// createCampaign('test019', 'Fregg', ['0754718952','0723636800'], 'test#0019')

async function run () {
  
       await apiConfig('eshansky7', 'Eshan@sky7')
      //  await charge('1','2')
      await getCampaignList().then(data => {
        console.log(data)
      }).catch(error => {
        console.log(error);
      })
      

}
run()