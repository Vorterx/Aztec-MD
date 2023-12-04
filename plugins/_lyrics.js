const axios = require('axios');

module.exports = {
  name: 'lyrics',
  description: 'To get the lyrics for your music',
  category: 'Search',
  async client(vorterx, m, { text, args, connect }) {
    if (!text) {
      await connect('❌');
      return m.reply('Please provide a song name');
    }

    const apiUrl = `https://api.neoxr.eu/api/lyric?q=${encodeURIComponent(text)}&apikey=AlMiT7`;

    try {
      await connect('🍏');
      const response = await axios.get(apiUrl);
      const data = response.data;

      if (response.status === 200) {
        const lyrics = data.lyrics;
        const thumbnail = data.thumbnail;

        const sendLyrics = `Lyrics for "${text}":\n\n${lyrics}`;
        vorterx.sendMessage(m.from, { image: { url: thumbnail, caption: sendLyrics } });
      } else {
        const errorMessage = data.message || 'Unknown error occurred';
        vorterx.sendMessage(m.from, `Failed to get lyrics: ${errorMessage}`, 'text');
      }
    } catch (error) {
      console.error(error);
      m.reply('An error occurred while fetching lyrics', 'text');
    }
  },
};
