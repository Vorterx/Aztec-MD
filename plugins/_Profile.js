const axios = require('axios');
const ytdl = require('ytdl-core-discord');

module.exports = {
  name: 'play',
  category: 'Downloads',
  async client(vorterx, m, { text, args, quoted, connect }) {
   
    if (!text) {
      await connect('❌');
      return m.reply('Provide a song name');
    }

    try {
      const { data: videos } = await axios.get(`https://weeb-api.vercel.app/ytsearch?query=${text}`);

      if (!videos || !videos.length) {
        return m.reply('Sorry, no song found');
      }

      const thumbnail = videos[0].thumbnail;
      const videoUrl = videos[0].url;
      const audioStream = await ytdl(videoUrl, { filter: 'audioonly' });

      const msgData = {
        audio: audioStream,
        mimetype: 'audio/mpeg',
        contextInfo: {
          externalAdReply: {
            filename: 'song.mp3',
            title: videos[0].title,
            thumbnail: thumbnail,
            mediaType: 2,
            body: videos[0].description,
            mediaUrl: videos[0].url
          }
        }
      };

      vorterx.sendMessage(m.from, msgData);
    } catch (error) {
      console.error(error);
      return m.reply('An error occurred while processing the request.');
    }
  }
};
