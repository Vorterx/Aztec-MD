/*
* @Author: DiegosonTech
* @BotName: Aztec-MD
*/

const axios = require('axios');
const config = require('../../config.js');
const { Zenith } = require ('../../lib/_cmd_sxntax.js');


Zenith(
  {
  usage: 'dalli',
  alias: ['imagine'],
  category: 'GPT AI',
  desc: 'To Download images using dalle E',
  filename: __filename
  }, async (vorterx, coax, react, {args}) => {
    try {
        if (!args) {
        await react('❌');
        return coax.reply('__Provide a name___...');
      }

      await react('✔️');
      const search = encodeURIComponent(args);
      const get = await axios.get(`https://v2-guru-indratensei.cloud.okteto.net/scrape?query=${search}`);
      const data = get.data;
      const dalle_img = data.image_links;
      const aztec = `*Name*: ${search}\n\n*${config.CAPTION}*`;

      const get_img = dalle_img[Math.floor(Math.random() * dalle_img.length)];
      await vorterx.sendMessage(coax.from, {
        image: { url: get_img },
        caption: aztec
      }, { quoted: coax });

    } catch (error) {
      console.error(error.message);
      await react('❌');
      coax.reply('An unexpected error occurred. Please try again later...');
    }
  });
    
