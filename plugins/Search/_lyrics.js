const config = require('../../config.js');
const axios = require('axios');
const { Buffer } = require('buffer');
const { Zenith } = require('../../lib/_cmd_sxntax.js');

Zenith(
  {
  usage: 'lyrics',
  category: 'Search',
  filename: __filename
  }, async (vorterx,m, react, {args}) => {
  
    try {
      if (!args || typeof args !== 'string') {
        await react('❌');
        return m.reply(`Please provide a song name or artist. For example, "Dior by Pop Smoke"`);
      }
      const search = encodeURIComponent(args.trim());
      const { data } = await axios.get(`https://weeb-api.vercel.app/genius?query=${search}`);

      if (!data || data.length === 0) {
        return m.reply('Lyrics not found for the given song or artist.');
      }

      console.log(data);
      await react('📝');

      const title = data[0].title;
      const artist = data[0].artist;
      const lyricsRes = await axios.get(`https://weeb-api.vercel.app/lyrics?url=${data[0].url}`);
      const lyrics = lyricsRes.data || 'Lyrics not found.';
      const thumbnail = data[0].url;
      const img = thumbnail ? Buffer.from(thumbnail).toString('base64') : '';
      const res = `*🌷TITLE*: ${title}\n\n*👤ARTIST*: ${artist}\n\n${lyrics}\n\n*${config.CAPTION}*`;

      const msgData = {
        text: res,
        contextInfo: {
          externalAdReply: {
            title: '',
            body: res,
            mediaType: 2,
            mediaUrl: img,
            thumbnail: img
          }
        },
        data: [0, ...(data[0].data || [])].map(JSON.stringify)
      };

      return vorterx.sendMessage(m.chat, msgData);
    } catch (error) {
      console.error(error);
      return m.reply('An error occurred while processing...');
    }
  });
          
