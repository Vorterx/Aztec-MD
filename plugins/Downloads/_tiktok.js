const { ttdl } = require('btch-downloader');
const { tiny } = require('@viper-x/fancytext');
const config = require('../../config.js');

module.exports = {
  name: 'tiktok',
  alias: ['tik', 'tiktokdl', 'ttdl'],
  category: 'Downloads',
  description: 'To download TikTok videos',
  async client(vorterx, m, { args, connect }) {
    if (!args) {
      await connect('❌');
      return m.reply('Provide a valid TikTok video URL...');
    }

    await connect('📥');
    m.reply(`\`\`\`Downloading TikTok video, please wait...⏳\`\`\``);
    const result = await ttdl(args);

    if (result && result.video && result.video.length > 0) {
      const get_vid = result.video[0];
      const caption = `*Title:* ${result.title}\n*Size:* ${result.title_size}\n*Audio:* ${result.title_audio}\n\n*${config.CAPTION}*`;

      await vorterx.sendMessage(m.from, { video: { url: get_vid }, caption: tiny(caption) });
    } else {
      await connect('❌');
      return m.reply('Failed to download the TikTok video...');
    }
  }
};
