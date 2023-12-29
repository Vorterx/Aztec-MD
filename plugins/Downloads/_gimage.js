/*
* @Author: DiegosonTech
* @BotName: Aztec-MD
*/

const config = require('../../config.js');
const gis = require('g-i-s');
const { Zenith } = require ('../../lib/_cmd_sxntax.js');


function gisPromise(args) {
  return new Promise((resolve, reject) => {
    gis(args, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}

Zenith(
  {
  usage: 'gimage',
  alias: ['googleimg'],
  category: 'Downloads',
  desc: 'To Download with gimage',
  filename: __filename
  }, async (vorterx, coax, args, react) => {
    
    if (!args) {
      await react('❌');
      return coax.reply('Please provide an image name...');
    }
    await react('✔️');

    try {
      const search = await gisPromise(args);
      if (!search || search.length === 0) {
        await react('❌');
        return coax.reply('_No images found for the given term...');
      }

      const random_img = search[Math.floor(Math.random() * search.length)].url;
      const res = {
        image: { url: random_img },
        caption: `*GIMAGE DOWNLD*\n\n*TERM*: ${args}\n\n*${config.CAPTION}*`
      };

      vorterx.sendMessage(coax.from, res, { quoted: coax });
    } catch (error) {
      console.error(error);
      await react('❌');
      return coax.reply('An error occurred while fetching images...');
    }
  });
    
