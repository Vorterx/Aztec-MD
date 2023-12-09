const axios = require('axios');

module.exports = {
  name: 'lyrics',
  async client(vorterx, m, { text, args, connect }) {
    if (!text) {
      await connect('❌');
      return vorterx.sendMessage(m.from, 'Please provide a song name or artist.');
    }
    
    try {
      const searchTerm = encodeURIComponent(text.trim());
      const { data } = await axios(`https://weeb-api.vercel.app/genius?query=${searchTerm}`);
      
      if (!data || !data[0] || !data[0].lyrics || data[0].lyrics === 'Lyrics not found') {
        return vorterx.sendMessage(m.from, 'Lyrics not found for the given song or artist.');
      }
      
      const title = data[0].title;
      const artist = data[0].artist;
      const lyrics = data[0].lyrics;
      
      const response = `*Title*: ${title}\n*Artist*: ${artist}\n\n${lyrics}`;
      
      return vorterx.sendMessage(m.from, response, {
        contextInfo: {
          externalAdReply: {
            title: title,
            body: response,
            mediaType: 2,
            mediaUrl: data[0].thumbnail
          }
        }
      });
    } catch (error) {
      console.error(error);
      return vorterx.sendMessage(m.from, 'An error occurred while fetching the lyrics.');
    }
  }
};
