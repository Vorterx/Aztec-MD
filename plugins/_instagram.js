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

      m.reply('Downloading your video, please wait...⏳');
      if (data.startsWith('http://') || data.startsWith('https://')) {
        vorterx.sendMessage(m.from, { video: { url: data } }, { quoted: m });
      } else {
        vorterx.sendMessage(m.from, { video: { url: `https://${data}` } }, { quoted: m });
      }
    } catch (error) {
      console.error(error);
      return m.reply('Failed to download the video.');
    }
  },
};
