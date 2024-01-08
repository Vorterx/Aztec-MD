const axios = require('axios');
const { Zenith } = require('../../lib/functions');
const config = require('../../config');

Zenith({
  usage: 'carbon',
  desc: 'make a logo to carbon',
  category: 'IMAGE GEN',
}, async (vorterx, m, react, { args }) => {
 
  if (!args) {
    await react('❌');
    return m.reply('Please provide a text e.g console.log(Hello World)');
  }

  const encodedArgs = encodeURIComponent(args);
  const carbon_app = `https://api.lolhuman.xyz/api/carbon?apikey=GataDios&code=${encodedArgs}&language=python`;
  console.log(carbon_app);

  try {
    await react('✔️');
    const res = await axios.get(carbon_app);
    const gen_carbon = res.data.result;
    console.log(gen_carbon);

    if (!gen_carbon) {
      await react('❌');
      return m.reply('_Error generating carbon image._');
    }

    await vorterx.sendMessage(m.chat, {
      image: { url: gen_carbon.toString() },
      caption: config.CAPTION || '',
      quoted: m,
    });
  } catch (error) {
    console.error(error.message);
    await react('❌');
    return m.reply('_Error occurred, sorry._');
  }
});
    
