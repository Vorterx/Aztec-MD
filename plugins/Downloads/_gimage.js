const config = require('../../config.js');
const gis = require('g-i-s');

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
    const search = await gis(args);

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
  }
};
  
