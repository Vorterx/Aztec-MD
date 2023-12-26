const fetch = require('node-fetch');

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
      const response = await fetch(tikLink);
      const data = await response.json();

      const getVid = data.download_link;

      if (getVid) {
   await vorterx.sendMessage(m.from, { video: { url: getVid } });

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
      
