const { Zenith } = require('../../lib/functions');
const config = require('../..config');
const { ssweb } = require('api-dylux');

Zenith(
  {
    usage: 'ssweb',
    desc: 'Capture screenshot of URL',
    category: 'Miscellaneous',
  }, async (vorterx, m, react, { args }) => {

    if (!args) {
      await react('❌');
      return m.reply('_Please provide a URL_');
    }

    if (!args[0].startsWith("https://")) {
      await react('❌');
      return m.reply('_Invalid URL format_');
    }

    try {
      const sssw = await ssweb(args[0]);
      await react("📸");    
      const caption = `*${config.CAPTION}*`;
      vorterx.sendMessage(m.chat, { image: sssw, caption, headerType: 4 }, { quoted: m });

    } catch (error) {
      console.error(error);
      await react('❌');
      return m.reply('_Error capturing screenshot_');
    }
  });
