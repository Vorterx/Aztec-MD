const axios = require('axios');

module.exports = {
  name: 'twitter',
  description: 'Downloads Twitter videos',
  async xstart(vorterx, m, { args, text, quoted, xReact }) {
    
    if (!args[0]) {
      await xReact('❌');
      return m.reply('_⚠️ Please provide a Twitter video URL._');
    }

    try {
      const response = await axios.get(`https://api.neoxr.eu/api/twitter?url=${args[0]}&apikey=LOLCff`);    
      if (!response.data || !response.data.video_url) {
      await xReact('❌');
        return m.reply('_❌ Failed to fetch the video from your URL._');
      }

      await xReact('📤');
      const videoUrl = response.data.video_url;
      const title = response.data.title;
      const publishedDate = response.data.published_date;
      const size = response.data.size;

      const videoResponse = await axios.get(videoUrl, {
        responseType: 'arraybuffer',
      });

        if (!videoResponse.data) {
        return m.reply('_❌ Failed to download the video._');
      }
     vorterx.sendMessage(m.from, { url: videoUrl, mimetype: 'video/mp4', caption: `📹 **TTITLE:** ${title}\n📅 **PUBLISHED:** ${publishedDate}\n📏 **SIZE:** ${size}`, file: videoResponse.data, });
     } catch (error) {
      m.reply('❌ An error occurred while processing the request');
    } },
};
