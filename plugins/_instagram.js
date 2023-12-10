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

      const { mediaUrl, caption } = data;
      m.reply('Downloading your video please wait...⏳');
      vorterx.sendMessage(m.from, { video: { url: mediaUrl }, caption }, { quoted: m });
    } catch (error) {
      console.error(error);
      return m.reply('Failed to download the video.');
    }
  },
};
