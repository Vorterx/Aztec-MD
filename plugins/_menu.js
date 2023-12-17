const axios = require('axios');
const { tiny } = require("@viper-x/fancytext");
const fs = require("fs");
const config = require("../config.js");
const path = require("path");

const pluginDir = path.join(__dirname);
const pluginFiles = fs.readdirSync(pluginDir);
const commandsByCategory = {};

for (const file of pluginFiles) {
  if (!file.endsWith('.js') || file === 'menu.js') {
    continue;
  }
  
  const plugin = require(path.join(pluginDir, file));
  const category = plugin.category;

  if (!commandsByCategory[category]) {
    commandsByCategory[category] = [];
  }
  
  commandsByCategory[category].push(plugin);
}

module.exports = {
  name: 'menu',
  alias: ['h', 'help'],
  description: 'Reveals menu categories commands',
  async client(vorterx, m, { args, connect }) {
   
    await connect('Ⓜ️');

    const allLogos = [...(config.LOGOS || []), ...(process.env.LOGOS ? process.env.LOGOS.split(',') : [])];
    const doIndex = Math.floor(Math.random() * allLogos.length);
    const getLogo = allLogos[doIndex];

    const isImage = /\.(jpg|jpeg|png|gif)$/i.test(getLogo);
    const mediaType = isImage ? 1 : 2;
    let headerTop, midSection, bottomSection, categoryLeft, categoryRight, commandLine, categoryEnd;
    let randomMenu = 0;

    if (!process.env.MENU) { randomMenu = Math.floor(Math.random() * 2) + 1; }        

    if (randomMenu == 1 || process.env.MENU.trim().startsWith("1") || process.env.MENU.toLowerCase().includes("aztec-md")) {  
      headerTop = `┏━━⟪ *${process.env.BOTNAME}* ⟫━━⦿`;
      midSection = `┃ ✗`;
      bottomSection = `┗━━━━━━━━━━━━━━⦿`;
      categoryLeft = `\n┌──『`;
      categoryRight = `』──❖\n\n`;
      commandLine = ` | `;
      categoryEnd = `\n\n└─────────◉\n`;
    }

    let getCommands = '';

    for (const category in commandsByCategory) {
      getCommands += `${categoryLeft} *${category}* ${categoryRight}\n\n`;
      getCommands += commandsByCategory[category].map(plugin => ` ${commandLine} ${plugin.name}`).join('\n');
      getCommands += `${categoryEnd}\n\n`;
    }

    const amarok = `${headerTop}
${midSection} User: ${m.pushName}
${midSection} Botname: ${process.env.BOTNAME}
${midSection} Prefix: ${process.env.PREFIX}
${midSection} Runtime: ${process.uptime()} seconds
${midSection} Time: ${new Date().toLocaleTimeString()}
${midSection} Date: ${new Date().toLocaleDateString()}
${bottomSection}\n\n${getCommands}\n\n*${config.CAPTION}*`;

    const chatBot = {
      [isImage ? 'image' : 'video']: {
        url: getLogo
      },
      caption: tiny(amarok),
      headerType: 2,
      contextInfo: {
        externalAdReply: {
          title: 'vorterx bot',
          body: 'ʙᴇsᴛ ᴛᴏ ᴜsᴇ',
          mediaType,
          thumbnail: {
            url: getLogo
          },
          sourceUrl: 'wa.me/27686881509',
          mediaUrl: '',
        },
      },
    };

    await vorterx.sendMessage(m.from, chatBot, { quoted: m });
  }
};
