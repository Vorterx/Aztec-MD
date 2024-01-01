const { Zenith, getBuffer } = require('../../lib/functions.js');
const YTM3 = require('../../lib/YTM3.js');
const yts = require('youtube-yts');
const fs = require('fs');

Zenith(
  {
    usage: 'audio',
    category: 'Downloads',
    desc: 'audio',
    filename: __filename
  },
  async (vorterx, coax, react, { args }) => {
    try {
      if (!args) {
        await react('❌');
        return coax.reply('Please provide a song name.');
      }

      const searchR = await yts(args);
      const video = searchR.videos[0];

      if (!video) {
        await react('❌');
        return coax.reply('No matching video found.');
      }

      const audioInfo = await YTM3.mp3(video.url);
      const audioMsg = {
        audio: fs.readFileSync(audioInfo.path),
        fileName: `${video.title}.mp3`,
        mimetype: 'audio/mp4',
        contextInfo: {
          externalAdReply: {
            title: video.title,
            body: '',
            thumbnail: await getBuffer(audioInfo.meta.image),
            mediaType: 2,
            mediaUrl: video.url,
          }
        },
      };

      await vorterx.sendMessage(coax.from, audioMsg, { quoted: coax });
      await fs.unlinkSync(audioInfo.path);
    } catch (error) {
      console.error(error);
      await react('❌');
      return coax.reply('An error occurred while processing your request...');
    }
  }
);
          
