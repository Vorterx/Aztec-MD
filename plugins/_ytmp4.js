const ytdl = require('ytdl-core');

module.exports = {
  name: 'ytmp4',
  alias: ['ytvid'],
  category: 'Downloads',
  async client(vorterx, m, { text, args, connect }) {
    
    if (args.length < 1 || !isUrl(text) || !ytdl.validateURL(text)) {
      await connect('❌');
      return m.reply(`*Please provide a yt link l cant dn*`);
  }

    await connect('📤');
    const videoInfo = await ytdl.getInfo(text);

    const videGet = `
      *Title:* ${videoInfo.videoDetails.title}
      *Date:* ${videoInfo.videoDetails.uploadDate}
      *Duration:* ${videoInfo.videoDetails.lengthSeconds}s
      *Quality:* ${videoInfo.videoDetails.qualityLabels[0]}
    `;

    await vorterx.sendMessage(m.from,{video: { url: videoInfo.videoDetails.video_url },caption: vidGet }, { quoted: m }
    );
  }
};
