const axios = require('axios');

module.exports = {
  name: 'lyrics',
  category: 'Search',
  async client(vorterx, m, { text, args, connect }) {
    if (!args[0]) {
      await connect('❌');
      return m.reply('Please provide a song name or artist.');
    }

    try {
      const search = args[0].trim();
      const { data } = await axios.get(`https://weeb-api.vercel.app/genius?query=${search}`);
      if (!data || data.error) {
        return m.reply('Lyrics not found for the given song or artist.');
      }
      const { data: lyricsData } = await axios.get(`https://weeb-api.vercel.app/lyrics?url=${data.url}`);
      return vorterx.sendMessage(m.from, {
        contextInfo: {
          externalAdReply: {
            title: 'hello',
            body: lyricsData,
            mediaType: 2,
            mediaUrl: data.thumbnail
          }
        }
      });
    } catch (error) {
      console.error(error);
      return m.reply('An error occurred while fetching the lyrics.');
    }
  }
};
