const yts = require("secktor-pack");
const ytdl = require('ytdl-secktor');
const { tiny } = require('@viper-x/fancytext');

module.exports = {
  name: 'video',
  category: 'Downloads',
  async client(vorterx, m, { text, args, connect }) {
   
    if (!args[0]) {
      await connect('❌');
      return m.reply('Video name required');
    }

    const search = await yts(args[0]);
    const videoInfo = search.videos[0];

    if (!videoInfo) {
      console.error("Video not found");
      return m.reply('Video not found 😂😂 search porn instead...');
    }

    const vid = `${videoInfo.title}\n*Size*: ${videoInfo.size}`;
    const videoStream = ytdl(videoInfo.url);

    vorterx.sendMessage(m.from, { video: videoStream,
      mimetype: 'video/mp4',
      fileName: `video.mp4`,
      caption: tiny(vid)
    }, { quoted: m });
  }
};
