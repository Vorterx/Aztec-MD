const { Zenith, getBuffer } = require('../../lib/functions.js');
const YTM3 = require('../../lib/YTM3.js');
const yts = require('youtube-yts');
const fs = require('fs');

Zenith(
  {
    usage: 'song',
    alias: ['audio'],
    category: 'Downloads',
    desc: 'audio',
    filename: __filename
  },
  async (vorterx, m, react, { args }) => {
    try {
      if (!args) {
        await react('❌');
        return m.reply('Please provide a song name.');
      }

      const searchR = await yts(args);
      const video = searchR.videos[0];

      if (!video) {
        await react('❌');
        return m.reply('No matching video found.');
      }

      try {
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

        await vorterx.sendMessage(m.chat, audioMsg, { quoted: m });
        await fs.unlinkSync(audioInfo.path);
      } catch (downloadError) {
        console.error('Error during audio download:', downloadError);
        await react('❌');
        return m.reply('An error occurred during audio download. Check the console for details.');
      }
    } catch (searchError) {
      console.error('Error during YouTube search:', searchError);
      await react('❌');
      return m.reply('An error occurred while searching for the video. Check the console for details.');
    }
  }
);
          
