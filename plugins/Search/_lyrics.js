const axios = require('axios');
const config = require('../../config.js');

module.exports = {
  name: 'lyrics',
  category: 'Search',
  async client(vorterx, m, { args, connect }) {
    try {
      if (!args || typeof args !== 'string') {
        await connect('❌');
        return m.reply(`Please provide a song name or artist. For example, "Dior by Pop Smoke"`);
      }

      const search = encodeURIComponent(args.trim());
      const { data } = await axios.get(`https://weeb-api.vercel.app/genius?query=${search}`);

      if (!data || data.length === 0) {
        return m.reply('Lyrics not found for the given song or artist.');
      }

      console.log(data);
      await connect('📝');

      const title = data[0].title;
      const artist = data[0].artist;
      const thumbnail = data[0].genius;
      const lyricsRes = await axios.get(`https://weeb-api.vercel.app/lyrics?url=${data[0].url}`);
      const lyrics = lyricsRes.data || 'Lyrics not found.';

      const res = `*🌷TITLE*: ${title}\n*👤ARTIST*: ${artist}\n\n${lyrics}\n\n*${config.CAPTION}*`;

      const msgData = {
        text: res,
        contextInfo: {
          externalAdReply: {
            title: `${config.CAPTION}`,
            body: res,
            mediaType: 2,
            mediaUrl: thumbnail,
            thumbnail: thumbnail
          }
        },
        data: [0, ...(data[0].data || [])].map(JSON.stringify)
      };

      await vorterx.sendMessage(m.from, msgData);
      await connect('🤖');
    } catch (error) {
      console.error(error);
      await connect('❌');
      return m.reply('An error occurred while fetching the lyrics.');
    }
  }
};
          
