const { Zenith } = require('../lib/_cmd_sxntax.js');
const config = require('../config.js');
const axios = require('axios');
const { tiny } = require('@viper-x/fancytext');
const fs = require('fs');
const path = require('path');

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

const configFile = path.join(__dirname, '../lib/config.json');
const configData = fs.readFileSync(configFile);
const configJson = JSON.parse(configData);

Zenith(
  {
    usage: 'menu',
    alias: ['h', 'help'],
    desc: 'Reveals menu categories commands',
    filename: __filename,
  },
  async (vorterx, coax, args, react) => {
    await react('Ⓜ️');

    const allLogos = [...(config.LOGOS || []), ...(process.env.LOGOS ? process.env.LOGOS.split(',') : [])];
    const doIndex = Math.floor(Math.random() * allLogos.length);
    const getLogo = allLogos[doIndex];

    const isImage = /\.(jpg|jpeg|png|gif)$/i.test(getLogo);
    const mediaType = isImage ? 1 : 2;
    let headerTop, midSection, bottomSection, categoryLeft, categoryRight, commandLine, categoryEnd;
    let randomMenu = 0;

    if (!process.env.MENU) {
      randomMenu = Math.floor(Math.random() * 2) + 1;
    }

    if (randomMenu == 1 || process.env.MENU.trim().startsWith('1') || process.env.MENU.toLowerCase().includes('aztec-md')) {
      headerTop = `┏━━⟪ *${configJson.Bots[0].BotName || ''}* ⟫━━⦿`;
      midSection = `┃ ✗`;
      bottomSection = `┗━━━━━━━━━━━━━━⦿`;
      categoryLeft = `┌──『`;
      categoryRight = `』──❖\n`;
      commandLine = `| `;
      categoryEnd = `\n└─────────◉\n`;
    }

    let getCommands = '';

    for (const category in commandsByCategory) {
      getCommands += `${categoryLeft} *${category}* ${categoryRight}\n`;
      getCommands += commandsByCategory[category].map((plugin) => ` ${commandLine} ${plugin.usage}`).join('\n');
      getCommands += `\n${categoryEnd}\n\n`;
    }

    const country = 'South Africa';
    const amarok = `${headerTop}
${midSection} User: ${m.pushName || ''}
${midSection} Botname: ${configJson.Bots[0].BotName || ''}
${midSection} Owner: ${configJson.Bots[0].Owner || ''}
${midSection} Prefix: ${process.env.PREFIX || ''}
${midSection} Runtime: ${process.uptime()} seconds
${midSection} Time: ${new Date().toLocaleTimeString()}
${midSection} Date: ${new Date().toLocaleDateString()}
${midSection} From: ${country || ''}
${bottomSection}\n\n${getCommands}*${config.CAPTION || ''}*`;

    const chatBot = {
      [isImage ? 'image' : 'video']: {
        url: getLogo,
      },
      caption: tiny(amarok),
      headerType: 2,
      contextInfo: {
        forwardingScore: 6,
        isForwarded: true,
        discountCode: 'CHATGPT20',
        externalAdReply: {
          title: `${config.CAPTION || ''}`,
          body: 'ʙᴇsᴛ ᴛᴏ ᴜsᴇ',
          mediaType,
          thumbnail: await getBuffer(getLogo),
          mediaUrl: '',
          sourceUrl: `${process.env.MODS || ''}`,
        },
      },
    };

    await vorterx.sendMessage(coax.from, chatBot, { quoted: coax });
  }
);
  
