/*
* @Author: DiegosonTech
* @BotName: Aztec-MD
*/

const { mediafiredl } = require('@bochilteam/scraper');
const { tiny } = require('@viper-x/fancytext');
const config = require('../../config.js');
const { Zenith } = require('../../lib/_cmd_sxntax.js');

function isValidUrl(string) {
  const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
  return urlRegex.test(string);
}

Zenith(
  {
  usage: 'mediafire',
  category: 'Downloads',
  desc: 'Download files from MediaFire links',
  filename: __filename
}, async (vorterx, m, react,{args}) => {
    try {
      if (args.length === 0 || !isValidUrl(args[0])) {
        await react('❌');
        return m.reply('Please provide a valid MediaFire link.');
      }

      await react('📤');
      await m.reply(`\`\`\`Downloading your media, wait...⏳\`\`\``);

      const result = await mediafiredl(args[0]);

      if (result) {
        const { url, filetype, filename, ext, filesizeH } = result;

        const v_cap = `
╭──*『 MEDIAFIRE DOWNLOAD 』*
│ *Name:* ${filename}
│ *Size:* ${filesizeH}
│ *Type:* ${filetype}
╰───────────────────༓\n\n*${config.CAPTION}*`;

        await vorterx.sendMessage(m.chat, {
          url,
          caption: tiny(v_cap),
          document: { url: filename, mimetype: ext },
          quoted: m,
        });
      } else {
        await react('❌');
        return m.reply('Failed to download the file. Please check the MediaFire link.');
      }
    } catch (error) {
      console.error(error);
      await react('❌');
      return m.reply('An unexpected error occurred during the download process.');
    }
  });
          
