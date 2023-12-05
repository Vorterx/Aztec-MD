const axios = require('axios');
const { tiny } = require("@viper-x/fancytext");
const fs = require("fs");
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
  category: 'General',
  description: 'Reveals menu categories commands',

  async client(vorterx, m, { args, connect }) {
   
    await connect('Ⓜ️');
    const chat_v = "https://repository-images.githubusercontent.com/292765152/b5b54c80-ef19-11ea-9998-10a88f042830";
    let getCommands = '';

    for (const category in commandsByCategory) {
      getCommands += `┌──『 *${category}* 』──❖\n\n`;
      getCommands += commandsByCategory[category].map(plugin => ` | ${plugin.name}`).join('\n');
      getCommands += '\n\n└─────────◉\n\n';
    }

    const up_up = `┏━━⟪ *${process.env.BOTNAME}* ⟫━━⦿`;
    const up_mid = `┃ ✗`;
    const up_btm = `┗━━━━━━━━━━━━━━⦿`;

    const amarok = `${up_up}
${up_mid} User: ${m.pushName}
${up_mid} Botname: ${process.env.BOTNAME}
${up_mid} Prefix: ${process.env.PREFIX}
${up_mid} Runtime: ${process.uptime()} seconds
${up_mid} Time: ${new Date().toLocaleTimeString()}
${up_mid} Date: ${new Date().toLocaleDateString()}
${up_btm}\n\n${getCommands}\n\n\n*©WHATSAPP CHATBOT*`;

    const chatBot = {
      image: {
        url: chat_v
      },
      caption: tiny(amarok),
      headerType: 2,
      contextInfo: {
        externalAdReply: {
          title: 'vorterx bot',
          body: 'ʙᴇsᴛ ᴛᴏ ᴜsᴇ',
          mediaType: 2,
          thumbnail: {
            url: chat_v
          },
          sourceUrl: 'wa.me/27686881509',
          mediaUrl: '',
        },
      },
    };

    await vorterx.sendMessage(m.from, chatBot, { quoted: m });
  }
};
