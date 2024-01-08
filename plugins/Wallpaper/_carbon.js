const axios = require('axios');
const { Zenith } = require('../../lib/functions');

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

  const apiKey = 'GatosDios8';
  const apiUrl = `https://api.lolhuman.xyz/api/carbon?apikey=${apiKey}&code=${args}&language=javascript`;

  try {
    const response = await axios.get(apiUrl);
    const imageLink = response.data.result;

    await vorterx.sendMessage(m.chat, {
      image: { URL: imageLink },
      caption: config.CAPTION, // Make sure config.CAPTION is defined
      quoted: m,
    });
  } catch (error) {
    console.error('Error fetching Carbon image:', error.message);
    await react('❌');
    return m.reply('Failed to generate Carbon image. Please try again later.');
  }
});
      
