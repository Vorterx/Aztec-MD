const ytdl = require('ytdl-core');
const yts = require("youtube-yts");
const fs = require('fs');

module.exports = {
  name: 'song',
  category: 'Downloads',
  async client(vorterx, m, { text, args, connect }) {

    if (!text) {
      await connect('❌');
      return m.reply(`Please provide a song name e.g song Dior by pop smoke`);
    }

    try {
      let search = await yts(text);
      let video = search.videos[0];
      
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
