const { ttdl } = require('btch-downloader');

module.exports = {
  name: 'tiktok',
  category: 'Downloads',
  async client(vorterx, m, { text, args, connect }) {

    if (!text) {
      await connect('❌');
      return m.reply('Please provide a TikTok video URL.');
    }

    try {
      await connect('📤');
            
        const data = await ttdl(text);     
        console.log(data);

      if (data && data.url) {
        vorterx.sendMessage(m.from, {
          video: {
            url: data.url,
            caption: `Downloaded from TikTok: ${data.title || 'No Title'}`,
          },
        });
        
      } else {
       return m.reply('Failed to get TikTok video data. Please check the provided URL.');
      }
    } catch (error) {
      console.error('Error downloading TikTok video:', error.message);
      m.reply(`An error occurred while downloading the TikTok video.: ${error.message}`);
    }
  },
};
