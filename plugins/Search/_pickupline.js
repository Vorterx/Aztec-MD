/*
* @Author: DiegosonTech
* @BotName: Aztec-MD
*/

const fetch = async (url) => import('node-fetch').then(module => module.default(url));
const config = require('../../config.js');

module.exports = {
  name: 'pickupline',
  category: 'Fun',
  async client(vortex, m, { args, connect }) {
   
    const get = await fetch('https://api.popcat.xyz/pickuplines');    
    if (!get.ok) {
      await connect('❌');
      return m.reply('Sorry, an error occurred while processing...');
    }

    await connect('✔️');
    const { pickupline } = await get.json();
    const msg = `*PICKUP LINE IS:*\n\n*${pickupline}*\n\n*${config.CAPTION}*`;
    m.reply(msg);
  }
};
