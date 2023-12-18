const { igdl } = require('btch-downloader');
const config = require('../config.js');

module.exports = {
  name: 'insta',
  alias: ['ig'],
  category: 'Downloads',
  async client(vorterx, m, { args, connect }) {
   
    if (!args[0]) {
      await connect('❌');
      return m.reply('Please provide a valid Instagram URL.');
    }

    try {
      const url = args[0];
      const data = await igdl(url);

      if (!data || data.length === 0) {
        return m.reply('Failed to download the video.');
      }

      console.log(data);
      await connect('📤');
      m.reply(`\`\`\`Downloading your video, please wait...⏳\`\`\``);

      for (let i of data) {
        const { quality, size, url } = i;
        const vidi = `*Size* : N/A\n*Quality* : 420p\n\n*${config.CAPTION}*`;

        vorterx.sendMessage(m.from, { video: { url }, caption: tiny(vidi)}, {quoted: m });
      }
    } catch (error) {
      console.error(error);
      return m.reply('Failed to download the video.');
    }
  },
};
