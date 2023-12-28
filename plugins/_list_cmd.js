const fs = require('fs');
const { tiny } = require('@viper-x/fancytext');
const config = require('../config.js');
const { getBuffer } = require('../../lib/_getBuffer.js');
const path = require('path');

module.exports = {
  name: 'list',
  category: 'General',
  async client(vorterx, m, { args, connect }) {
   
    await connect('📝');
    const allLogos = [...(config.LOGOS || []), ...(process.env.LOGOS ? process.env.LOGOS.split(',') : [])];
    const doIndex = Math.floor(Math.random() * allLogos.length);
    const getLogo = allLogos[doIndex];

    const isImage = /\.(jpg|jpeg|png|gif)$/i.test(getLogo);
    const mediaType = isImage ? 1 : 2;

    const pluginsDir = path.join(__dirname);
    const commandNames = [];

    function readCommandsFromDirectory(directory) {
      const files = fs.readdirSync(directory);

      for (const file of files) {
        const filePath = path.join(directory, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
          readCommandsFromDirectory(filePath);
        } else if (file.endsWith('.js') && file !== 'list.js') {
          const commandModule = require(filePath);
          if (commandModule && commandModule.name) {
            commandNames.push(commandModule.name);
          }
        }
      }
    }

    readCommandsFromDirectory(pluginsDir);

    let list_md = `
┏━━━━━━━━━━━━━━━
┃	*AZTEC_MD_LIST*
┗━━━━━━━━━━━━━━━
┌──────────────❖\n\n`;

    commandNames.forEach((name, index) => {
      list_md += ` | ${index + 1} ${name}\n`;
    });

    list_md += `\n└─────────────◉\n\n*${config.CAPTION}*`;

    const chatBot = {
      [isImage ? 'image' : 'video']: {
        url: getLogo,
      },
      caption: tiny(list_md),
      headerType: 2,
      contextInfo: {
        externalAdReply: {
          title: `${config.CAPTION}`,
          body: 'ʙᴇsᴛ ᴛᴏ ᴜsᴇ',
          mediaType,
          thumbnail: await getBuffer(getLogo),
          sourceUrl: `${process.env.MODS}`,
          mediaUrl: '',
        },
      },
    };

    await vorterx.sendMessage(m.from, chatBot, { quoted: m });
  },
};
