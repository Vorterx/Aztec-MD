const axios = require('axios');

module.exports = {
  name: 'lyrics',
  category: 'Search',
  async client(vorterx, m, { text, args, connect }) {
   
    try {
      if (!text || typeof text !== 'string') {
        await connect('❌');
        return m.reply(`\`\`\`Please provide a song name or artist.e.g Dior by pop smoke...⏳\`\`\``);
      }

      const search = encodeURIComponent(text.trim());
      const { data } = await axios.get(`https://weeb-api.vercel.app/genius?query=${search}`);

      if (!data || data.length === 0) {
        return m.reply('Lyrics not found for the given song or artist.');
      }
      
          console.log(data);
      await connect('📝');

      const title = data[0].title;
      const artist = data[0].artist;
      const lyricsRes = await axios.get(`https://weeb-api.vercel.app/lyrics?url=${data[0].url}`);
      const lyrics = lyricsRes.data || 'Lyrics not found.';

      const res = `*TITLE*: ${title}\n\n*ARTIST*: ${artist}\n\n${lyrics}`;

      const msgData = {
        text: res,
        contextInfo: {
          externalAdReply: {
            title: title,
            body: res,
            mediaType: 2,
            mediaUrl: data[0].thumbnail,
            thumbnail: await getBuffer(data[0].thumbnail)
          }
        },
        data: [0, ...(data[0].data || [])].map(JSON.stringify)
      };

      return vorterx.sendMessage(m.from, msgData);
    } catch (error) {
      console.error(error);
      return m.reply('An error occurred while fetching the lyrics.');
    }
  }
};
