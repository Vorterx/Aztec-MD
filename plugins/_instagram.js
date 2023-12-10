const { igdl } = require('btch-downloader');

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

      if (!data) {
        return m.reply('Failed to download the video.');
      }

      console.log('Data:', data);
      await connect('📤');

      m.reply(`\`\`\`Downloading your video, please wait...⏳\`\`\``);

      for (let i of data) {
        const { title, quality, size, url } = i;
        const vidi = `╭–– 『*INSTÀ Downloader*』\n┆ *Title* : ${title}\n┆ *Size* : ${size}\n┆ *Quality* : ${quality}\n╰–––––––––––––––༓`;

        vorterx.sendMessage(m.from, { video: { url}, caption: vidi }, {quoted: m });
      }
    } catch (error) {
      console.error(error);
      return m.reply('Failed to download the video.');
    }
  },
};
