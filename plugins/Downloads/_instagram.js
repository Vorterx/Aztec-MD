const { igdl } = require('btch-downloader');
const { tiny } = require('@viper-x/fancytext');
const config = require('../../config.js');

Zenith(
  {
  usage: 'insta',
  alias: ['ig'],
  category: 'Downloads',
  decs: 'to download insta vids',
  filename: __filename
  }, async (vorterx, coax, args, react) => {
   
    if (!args) {
      await react('❌');
      return coax.reply('Please provide a valid Instagram URL.');
    }

    try {
      const url = args;
      const data = await igdl(url);
      if (!data || data.length === 0) {
        return coax.reply('Failed to download the video.');
      }

      console.log(data);
      await react('📤');
      coax.reply(`\`\`\`Downloading your video, please wait...⏳\`\`\``);

      for (let i of data) {
        const { quality, size, url } = i;
        const vidi = `*Quality* : 420p\n\n*${config.CAPTION}*`;

        vorterx.sendMessage(coax.from, { video: { url }, caption: tiny(vidi)}, {quoted: coax });
      }
    } catch (error) {
      console.error(error);
      return coax.reply('Failed to download the video.');
    }
  });
