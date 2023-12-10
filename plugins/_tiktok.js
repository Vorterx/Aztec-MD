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

      if (!data || !Array.isArray(data) || data.length === 0) {
        await connect('❌');
        return m.reply('Failed to download the video.');
      }

      await connect('📤');
      m.reply(`\`\`\`Downloading your video, please wait...⏳\`\`\``);

      for (const item of data) {
        const { quality, size, url } = item;
        const videoInfo = `╭–– *『TIKTOK Downloader』*\n┆ *Size*: ${size || 'N/A'}\n┆ *Quality*: ${quality || 'N/A'}\n╰–––––––––––––––༓`;

        vorterx.sendMessage(m.from, { video: { url }, caption: videoInfo }, { quoted: m });
      }
    } catch (error) {
      console.error(error);
      await connect('❌');
      return m.reply('Failed to download the video.');
    }
  },
};
