const axios = require('axios');

module.exports = {
  name: 'lyrics',
  async client(vorterx, m, { text, args, connect }) {
    try {
      if (!m.text || typeof m.text !== 'string') {
        await connect('❌');
        return vorterx.sendMessage(m.from, 'Please provide a song name or artist.');
      }

      const searchTerm = encodeURIComponent(m.text.trim());
      const { data } = await axios(`https://weeb-api.vercel.app/lyrics?url=${searchTerm}`);

      if (!data || !data.lyrics || data.lyrics === 'Lyrics not found') {
        return vorterx.sendMessage(m.from, 'Lyrics not found for the given song or artist.');
      }

      const title = data.title;
      const artist = data.artist;
      const lyrics = data.lyrics;

      const response = `*Title*: ${title}\n*Artist*: ${artist}\n\n${lyrics}`;

      return vorterx.sendMessage(m.from, response, {
        contextInfo: {
          externalAdReply: {
            title: title,
            body: response,
            mediaType: 2,
            mediaUrl: data.thumbnail
          }
        }
      });
    } catch (error) {
      console.error(error);
      return vorterx.sendMessage(m.from, 'An error occurred while fetching the lyrics.');
    }
  }
};
