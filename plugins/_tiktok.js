const { ttdl } = require('btch-downloader');

module.exports = {
  name: 'tiktok',
  alias: ['tik'],
  category: 'Downloads',
  async client(vorterx, m, { args, connect }) {
    if (!args[0]) {
      await connect('❌');
      return m.reply('Please provide a valid TikTok URL.');
    }

    try {
      const url = args[0];
      const data = await ttdl(url);

      if (!data || typeof data[Symbol.iterator] !== 'function') {
        return m.reply('Failed to download the video.');
      }

      await connect('📤');
      m.reply(`\`\`\`Downloading your video, please wait...⏳\`\`\``);

      for (let i of data) {
        const { quality, size, url } = i;
        const vidi = `╭–– *『TIKTOK Downloader』*\n┆ *Size* : N/A\n┆ *Quality* : 420p\n╰–––––––––––––––༓`;

        vorterx.sendMessage(m.from, { video: { url }, caption: vidi }, { quoted: m });
      }
    } catch (error) {
      console.error(error);
      return m.reply('Failed to download the video.');
    }
  },
};
