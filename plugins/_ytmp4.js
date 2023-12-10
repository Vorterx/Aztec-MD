const ytdl = require('ytdl-core');

function isUrl(string) {
  const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
  return urlRegex.test(string);
}

module.exports = {
  name: 'ytmp4',
  alias: ['ytvid'],
  category: 'Downloads',
  async client(vorterx, m, { text, args, connect }) {
    if (args.length < 1 || !isUrl(text) || !ytdl.validateURL(text)) {
      await connect('❌');
      return m.reply(`*Please provide a YouTube link that I can download.*`);
    }

    await connect('📤');
    const videoInfo = await ytdl.getInfo(text);

    const vidGet = `
      *Title:* ${videoInfo.videoDetails.title}
      *Date:* ${videoInfo.videoDetails.uploadDate}
      *Duration:* ${videoInfo.videoDetails.lengthSeconds}s
      *Quality:* ${videoInfo.videoDetails.qualityLabels[0]}
    `;

    await vorterx.sendMessage(m.from, { video: { url: videoInfo.videoDetails.video_url }, caption: vidGet }, { quoted: m });
  }
};
