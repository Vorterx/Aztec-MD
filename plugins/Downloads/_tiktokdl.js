const { ttdl } = require('btch-downloader');
const config = requir('../../config.js');

module.exports = {
  name: 'tiktokdl',
  category: 'Downloads',
  description: 'To Download tiktok videos',
  async client(vorterx, m, { text, args, connect }) {
   
    if (!args) {
      await connect('❌');
      return m.reply("Provide me a valid tiktok URL link.");
    }

    await connect('📤');
    
    const data = await ttdl(args);
    const watermark = data.video[0];
    const { title } = data;

    vorterx.sendMessage(m.from, { video: watermark, caption: `*Title*: ${title}\n\n*${config.CAPTION}*` }, { quoted: m });
  }
};
