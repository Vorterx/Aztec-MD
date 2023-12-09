const axios = require('axios');

module.exports = {
  name: 'lyrics',
  category: 'Search',
  async client(vorterx, m, { text, args, connect }) {
    try {
      if (!text || typeof text !== 'string') {
        await connect('❌');
        return m.reply('Please provide a song name or artist.');
      }

      const search = encodeURIComponent(text.trim());
      const { data } = await axios.get(`https://weeb-api.vercel.app/genius?query=${search}`);

      if (!data || data.error) {
        return m.reply('Lyrics not found for the given song or artist.');
      }

      const title = data.title;
      const artist = data.artist;
      const lyricsResponse = await axios.get(`https://weeb-api.vercel.app/lyrics?url=${data.url}`);
      const lyrics = lyricsResponse.data || 'Lyrics not found.';

      const res = `*Title*: ${title}\n*Artist*: ${artist}\n\n${lyrics}`;

      const messageData = {
        text: res,
        contextInfo: {
          externalAdReply: {
            title: title,
            body: res,
            mediaType: 2,
            mediaUrl: data.thumbnail
          }
        },
        data: [0, ...(data.data || [])].map(JSON.stringify)
      };

      return vorterx.sendMessage(m.from, messageData);
    } catch (error) {
      console.error(error);
      return m.reply('An error occurred while fetching the lyrics.');
    }
  }
};
