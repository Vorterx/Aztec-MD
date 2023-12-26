
const axios = require('axios');

module.exports = {
  name: 'tiktok',
  category: 'Downloads',
  async client(vorterx, m, { args, connect }) {
    if (!args) {
      await connect('❌');
      return m.reply('Provide a TikTok URL...');
    }

    const tikLink = `https://api.caliph.biz.id/api/tiktok?url=${args}&apikey=lykoUzNh`;

    try {
      const response = await axios.get(tikLink);
      const data = response.data;

      const getVid = data.download_link;

      if (getVid) {
        await vorterx.sendMessage(m.from, { video: { url: getVid } });
        return m.reply('Video sent!');
      } else {
        await connect('❌');
        return m.reply('Unable to fetch download link. Please check the TikTok URL.');
      }
    } catch (error) {
      console.error('Error:', error.message);
      await connect('❌');
      return m.reply('An error occurred while processing the request.');
    }
  }
};
    
