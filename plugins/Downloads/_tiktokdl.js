const { Zenith } = require('../../lib/functions.js');


Zenith (
  {
  usage: 'tiktok',
  alias: ['tik', 'tiktokdl', 'ttdl'],
  category: 'Downloads',
  desc: 'To download TikTok videos',
  filename: __filename
}, async (vorterx, m, react, {args}) => {
    if (!args) {
      await react('❌');
      return m.reply('Provide a valid TikTok video URL...');
    }

    await react('📥');
    m.reply(`\`\`\`Downloading TikTok video, please wait...⏳\`\`\``);
    const result = await ttdl(args);

    if (result && result.video && result.video.length > 0) {
      const get_vid = result.video[0];
      const caption = `*Title:* ${result.title}\n*Audio:* ${result.title_audio}\n\n*${config.CAPTION}*`;

      await vorterx.sendMessage(m.chat, { video: { url: get_vid }, caption: tiny(caption) });
    } else {
      await react('❌');
      return m.reply('Failed to download the TikTok video...');
    }
});
