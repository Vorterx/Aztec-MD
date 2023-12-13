const ytdl = require('ytdl-core');
const { getBuffer, isUrl } = require('../lib/_getBuffer.js');

module.exports = {
  name: 'ytmp3',
  category: 'Downloads',
  async client(vorterx, m, { text, args, connect }) {
    
    if (typeof text === 'string' && /^https?:\/\//.test(text) && isUrl(text)) {
      const info = await ytdl.getInfo(text);
      const audio = ytdl.downloadFromInfo(info, { quality: 'highestaudio' });

      await vorterx.sendMessage(m.from, {
        audio: audio,
        mimetype: 'audio/mp4',
        ptt: true,
        contextInfo: {
          externalAdReply: {
            title: info.videoDetails.title,
            body: 'vorterx',
            thumbnail: await getBuffer(info.videoDetails.thumbnail.thumbnails[0].url),
            mediaType: 2,
            mediaUrl: text,
          },
        },
      }, { quoted: m });
    } else {
      console.error('Invalid URL:', text);
      await connect('❌');
      return m.reply(`Please provide a valid URL...`);
    }
  }
};
