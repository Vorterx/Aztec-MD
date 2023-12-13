const { ttdl } = require('btch-downloader');

module.exports = {
  name: 'tiktok',
  category: 'Downloads',
  async client(vorterx, m, { text, args, connect }) {
  
    if (!text) {
      await connect('❌');
     return m.reply('Please provide a TikTok URL...');
    }

    const url = text;

    try {
      await connect('📤');
      await m.reply(url)
      const data = await ttdl(url);
      
     return data

      if (data && data.url && data.url.length > 0) {
        const vid = data.url[0];
        vorterx.sendMessage(m.from, {
          video: {
            url: vid,
            caption: `${data.title}`,
          },
    });
      } else {
        m.reply('Failed to download: Please check the provided url ..');
      }
    } catch (error) {
      console.error('Error downloading TikTok video:', error.message);
      m.reply(`An error occurred while downloading the TikTok video: ${error.message}`);
    }
  },
};
