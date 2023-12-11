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

     
    if (text && (text.toString().startsWith('http://') || text.toString().startsWith('https://'))) {
      const videoStream = ytdl(text, { quality: 'highest' });

      await vorterx.sendMessage(m.from, { video: videoStream, caption: `╭–– *『YTMP4 DOWNDR』*\n┆\n*Title*: ${videoInfo.videoDetails.title}\n┆\n*Duration*: ${videoInfo.videoDetails.lengthSeconds}s\n╰–––––––––––––––༓` }, { quoted: m });
    } else {
      await connect('❌');
      return m.reply(`*Invalid URL format.*`);
    }
  }
};
