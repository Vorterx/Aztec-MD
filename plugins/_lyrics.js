const axios = require('axios');

module.exports = {
  name: 'lyrics',
 category: 'Search',
  async client(vorterx, m, { text, args, connect }) {
    
    if (!text) {
      await connect('❌');
      return m.reply('Please provide a song name or artist.');
    }
    
    try {
      const search = encodeURIComponent(text.trim());
      const { data } = await axios(`https://weeb-api.vercel.app/genius?query=${search}`);
      
      if (!data || !data.lyrics) {
        return m.reply('Lyrics not found for the given song or artist.');
      }
      
      const title = data.title;
      const artist = data.artist;
      const lyrics = data.lyrics;
      
      const res = `*Title*: ${title}\n*Artist*: ${artist}\n\n${lyrics}`;
      
      return m.reply(res, 'from', {
        contextInfo: {
          externalAdReply: {
            title: title,
            body: res,
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
