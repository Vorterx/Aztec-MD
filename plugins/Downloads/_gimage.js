/*
* @Author: DiegosonTech
* @BotName: Aztec-MD
*/

const config = require('../../config.js');
const gis = require('g-i-s');

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

module.exports = {
  name: 'gimage',
  alias: ['googleimg'],
  category: 'Downloads',

  async client(vorterx, m, { args, connect }) {
    if (!args) {
      await connect('❌');
      return m.reply('Please provide an image name...');
    }

    await connect('✔️');

    try {
      const search = await gisPromise(args);

      if (!search || search.length === 0) {
        await connect('❌');
        return m.reply('_No images found for the given term...');
      }

      const random_img = search[Math.floor(Math.random() * search.length)].url;
      const res = {
        image: { url: random_img },
        caption: `*GIMAGE DOWNLD*\n\n*TERM*: ${args}\n\n*${config.CAPTION}*`
      };

      vorterx.sendMessage(m.from, res, { quoted: m });
    } catch (error) {
      console.error('Error in gisPromise:', error);
      await connect('❌');
      return m.reply('An error occurred while fetching images.');
    }
  }
};
    
