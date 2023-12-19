const yts = require("secktor-pack");

module.exports = {
  name: 'video',
  category: 'Downloads',
  async client(vorterx, m, { text, args, connect }) {
   
    if (!args[0]) {
      await connect('❌');
      return m.reply('Video name required');
    }

    const search = await yts(args[0]);
    const res = search.videos[0]?.url;

    if (!res) {
      console.error("Video not found");
      return m.reply('Video not found 😂😂 search porn instead...');
    }
    let vid = `${search.videos[0]?.title}\n*Size*: ${search.video[0]?.size}`;
    
    vorterx.sendMessage(m.from, { video: await vorterx.downloadMedia(res), mimetype: 'video/mp4', fileName: `video.mp4`,
      caption: tiny(vid)
    }, { quoted: m });
  }
};
