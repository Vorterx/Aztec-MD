const ytdl = require('ytdl-core');
const yts = require("youtube-yts");
const fs = require('fs');
const { getBuffer } = require('../lib/_getBuffer.js');

module.exports = {
  name: 'song',
  category: 'Downloads',
  async client(vorterx, m, { text, args, connect }) {

    const mBot = process.env.BOTNAME;
    
    if (!text) {
      await connect('❌');
      return m.reply(`Please provide a song name e.g song Dior by pop smoke`);
    }

    try {
      let search = await yts(text);
      let video = search.videos[0];

      // Check if video is defined before accessing its properties
      if (!video) {
        await connect('❌');
        return m.reply(`No video found for the given search.`);
      }

      // Check if video.thumbnail is defined before using it
      if (!video.thumbnail) {
        await connect('❌');
        return m.reply(`Thumbnail not available for the selected video.`);
      }

      const stream = ytdl(video.url, { filter: 'audioonly' });

      const thumbnailBuffer = await getBuffer(video.thumbnail);

      await vorterx.sendMessage(m.from, {
        audio: stream,
        fileName: video.title + '.mp3',
        mimetype: 'audio/mp3',
        ptt: true,
        contextInfo: {
          externalAdReply: {
            title: video.title,
            body: mBot, 
            thumbnail: thumbnailBuffer,
            mediaType: 2,
            mediaUrl: video.url,
          }
        },
      }, { quoted: m });

    } catch (error) {
      console.error('Error:', error.message);
      m.reply(`An Error occurred: ${error.message}`);
    }
  }
};
