/*
* @Author: DiegosonTech
* @BotName: Aztec-MD
*/

const fetch = async (url) => import('node-fetch').then(module => module.default(url));
const config = require('../../config.js');
const { Zenith } = require ('../../lib/_cmd_sxntax.js');

Zenith(
  {
  usage: 'pickupline',
  category: 'Fun',
  desc: 'For funny',
  filename: __filename
  }, async (vortex, coax, react) => {
   
    const get = await fetch('https://api.popcat.xyz/pickuplines');    
    if (!get.ok) {
      await react('❌');
      return coax.reply('Sorry, an error occurred while processing...');
    }

    await react('😂');
    const { pickupline } = await get.json();
    const msg = `*PICKUP LINE IS:*\n\n*${pickupline}*\n\n*${config.CAPTION}*`;
    coax.reply(msg);
  });
