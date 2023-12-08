const axios = require('axios');
const ytdl = require('ytdl-core-discord');

module.exports = {
  name: 'play',
  category: 'Downloads',
  async client(vorterx, m, { text, args, quoted, connect }) {
    if (!text) { 
      await connect('❌');
      return m.reply('Provide a song name_____');
    }
      
    try {
      const { data: videos } = await axios(`https://weeb-api.vercel.app/ytsearch?query=${text}`);
      
      if (!videos || !videos.length) {
        return m.reply('Sorry, no song found___');
      }
      
      const videoUrl = videos[0].url;
      const audioStream = await ytdl(videoUrl, { filter: 'audioonly' });
      
      return (await m.reply(audioStream, 'audio', {
        contextInfo: {
          externalAdReply: {
            filename: 'song.mp3',
            title: videos[0].title,
            thumbnail: await getBuffer(videos[0].thumbnail),
            mediaType: 2,
            body: videos[0].description,
            mediaUrl: videos[0].url
          }
        }
      }));
    } catch (error) {
      console.error(error);
      return m.reply('An error occurred while processing the request.');
    }
  }
};

async function getBuffer(url) {
  const response = await axios.get(url, { responseType: 'arraybuffer' });
  return response.data;
        }
