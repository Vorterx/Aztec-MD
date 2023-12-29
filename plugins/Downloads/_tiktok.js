/*
* @Author: DiegosonTech
* @BotName: Aztec-MD
*/

const { ttdl } = require('btch-downloader');
const { tiny } = require('@viper-x/fancytext');
const config = require('../../config.js');

Zenith (
  {
  usage: 'tiktok',
  alias: ['tik', 'tiktokdl', 'ttdl'],
  category: 'Downloads',
  desc: 'To download TikTok videos',
  filename: __filename
}, async (vorterx, coax, args, react) => {
    if (!args) {
      await react('❌');
      return coax.reply('Provide a valid TikTok video URL...');
    }

    await react('📥');
    coax.reply(`\`\`\`Downloading TikTok video, please wait...⏳\`\`\``);
    const result = await ttdl(args);

    if (result && result.video && result.video.length > 0) {
      const get_vid = result.video[0];
      const caption = `*Title:* ${result.title}\n*Size:* ${result.title_size}\n*Audio:* ${result.title_audio}\n\n*${config.CAPTION}*`;

      await vorterx.sendMessage(coax.from, { video: { url: get_vid }, caption: tiny(caption) });
    } else {
      await react('❌');
      return coax.reply('Failed to download the TikTok video...');
    }
});
