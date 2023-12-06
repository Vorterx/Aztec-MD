
const savefrom = require('@bochilteam/scraper');

module.exports = {
  name: 'fb',
  description: 'To download Facebook videos',
  category: 'Downloads',
  async client(vorterx, m, { args, text, connect }) {
    if (!args[0]) {
      await connect('❌');
      return m.reply('Please provide a URL.');
    }

    try {
      const url = args[0];
      const data = await savefrom(url);
      const downloadUrl = data.video_download_url;

      if (!downloadUrl) {
        await connect('❌');
        return m.reply('Unable to retrieve download URL for the video.');
      }

      return vorterx.sendMessage(m.from, { video: { url: downloadUrl } });
    } catch (error) {
      console.error(error);
      await connect('❌');
      return m.reply(`An error occurred while downloading the video: ${error.message}`);
    }
  },
};
