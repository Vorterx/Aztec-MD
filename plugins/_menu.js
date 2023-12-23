const axios = require('axios');
const { tiny } = require("@viper-x/fancytext");
const fs = require("fs");
const config = require("../config.js");
const path = require("path");

const pluginDir = path.join(__dirname);
const commandsByCategory = {};

function readCommandsFromDirectory(directory) {
  const files = fs.readdirSync(directory);

  for (const file of files) {
    const filePath = path.join(directory, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      readCommandsFromDirectory(filePath);
    } else if (file.endsWith('.js') && file !== 'menu.js') {
      const plugin = require(filePath);
      const category = plugin.category || 'Uncategorized';

      if (!commandsByCategory[category]) {
        commandsByCategory[category] = [];
      }

      commandsByCategory[category].push(plugin);
    }
  }
}

readCommandsFromDirectory(pluginDir);

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
      headerTop = `┏━━⟪ *${process.env.BOTNAME || ''}* ⟫━━⦿`;
      midSection = `┃ ✗`;
      bottomSection = `┗━━━━━━━━━━━━━━⦿`;
      categoryLeft = `┌──『`;
      categoryRight = `』──❖\n`;
      commandLine = ` |\n `;
      categoryEnd = `\n\n└─────────◉\n\n`;
    }

    let getCommands = '';

    for (const category in commandsByCategory) {
      getCommands += `${categoryLeft} *${category}* ${categoryRight}\n`;
      getCommands += commandsByCategory[category].map(plugin => ` ${commandLine} ${plugin.name}`).join('\n');
      getCommands += `\n\n${categoryEnd}\n\n`;
    }

    const amarok = `${headerTop}
${midSection} User: ${m.pushName || ''}
${midSection} Botname: ${process.env.BOTNAME || ''}
${midSection} Prefix: ${process.env.PREFIX || ''}
${midSection} Runtime: ${process.uptime()} seconds
${midSection} Time: ${new Date().toLocaleTimeString()}
${midSection} Date: ${new Date().toLocaleDateString()}
${bottomSection}\n\n${getCommands}\n\n*${config.CAPTION || ''}*`;

    const chatBot = {
      [isImage ? 'image' : 'video']: {
        url: getLogo
      },
      caption: tiny(amarok),
      headerType: 2,
      contextInfo: {
        externalAdReply: {
          title: `${config.CAPTION || ''}`,
          body: 'ʙᴇsᴛ ᴛᴏ ᴜsᴇ',
          thumbnail: { mediaType: 'image', mediaUrl: 'https://i.ibb.co/vx1YRtp/original-356944951abd408e6ff5e1b4a988c4c9.png' },
          sourceUrl: `${process.env.MODS || ''}`,
          forwardingScore: 999,
          isForwarded: true,
          discountCode: 'CHATGPT20',
        },
      },
    };

    await vorterx.sendMessage(m.from, chatBot, { quoted: m });
  }
};
