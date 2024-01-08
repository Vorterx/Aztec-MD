const axios = require('axios');
const { Zenith } = require('../../lib/functions');
const config = require('../../config');

Zenith(
  {
    usage: 'carbon',
    desc: 'make a logo to carbon',
    category: 'IMAGE GEN',
  }, async (vorterx, m, react, { args }) => {

  if (!args) {
    await react('❌');
    return m.reply('Please provide a text e.g console.log(Hello World)');
  }

  const carbon_app = `https://api.lolhuman.xyz/api/carbon?apikey=GotaDios&code=${args}&language=javascript`;
  try {
    await react('✔️');
    const res = await axios.get(carbon_app);
    const gen_carbon = res.data.result;

    await vorterx.sendMessage(m.chat, {
      image: { url: gen_carbon },
      caption: config.CAPTION,
      quoted: m,
    });
  } catch (error) {
    console.error(error.message);
    await react('❌');
    return m.reply('_Err occurred sorry_');
  }
});
      
