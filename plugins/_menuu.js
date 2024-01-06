//
const { Zenith } = require('../lib/functions');
const fs = require('fs');
const path = require('path');

const prefix = process.env.PREFIX;
let country = 'South Africa';

Zenith(
  {
    usage: 'menu',
    desc: 'To get all the commands',
    category: 'Mics',
  }, 
  async (vorterx, m, react, { args, text }) => {
    await react('🌀');
    const pluginsPath = path.join(__dirname);

    try {
      let headInfoPrinted = false;
      let messageToSend = '';

      const configPath = path.join(__dirname, '../lib/config.json');
      const configJson = JSON.parse(fs.readFileSync(configPath, 'utf8'));

      const randomIndex = Math.floor(Math.random() * configJson.Bots.length);
      const randomBot = configJson.Bots[randomIndex];

      const menuDesign = {
        header: {
          left: '┏',
          right: '╼╾╼╾╼⦿\n',
          down: '┗╼╾╼╾╼╼╾╼╾╼╼╾╼╾╼⦿\n\n',
        },
        body: {
          left: '┌',
          right: '╾╼❖',
          up: '─╾╼╼『',
          down: '╰───◉',
        },
      };

      for (const category of fs.readdirSync(pluginsPath, { withFileTypes: true })) {
        if (category.isDirectory()) {
          const categoryPath = path.join(pluginsPath, category.name);
          const jsFiles = fs.readdirSync(categoryPath)
            .filter(file => file.endsWith('.js'));

          const commandsInCategory = [];

          for (const file of jsFiles) {
            const filePath = path.join(categoryPath, file);
            const fileContent = fs.readFileSync(filePath, 'utf8');

            if (fileContent.trim().startsWith('Zenith(')) {
              const commandInfo = eval(`(${fileContent.trim()})`);

              if (!headInfoPrinted) {
                messageToSend += `
${menuDesign.header.left}${menuDesign.header.right}
*NAME*: ${m.pushName}
*PREFIX*: ${prefix}
*OWNER*: ${randomBot.Owner || ''}
*FROM*: ${country}
${menuDesign.header.down}`;
                headInfoPrinted = true;
              }

              if (commandInfo.usage) {
                commandsInCategory.push(`
${menuDesign.body.left}${menuDesign.body.up}『${category.name}』${menuDesign.body.right}
${menuDesign.body.down} ${commandInfo.usage}
`);
              }
            }
          }

          if (commandsInCategory.length > 0) {
            messageToSend += commandsInCategory.join('\n');
            messageToSend += '\n';
          }
        }
      }

      vorterx.sendMessage(m.chat, messageToSend, { quoted: m });
        
    } catch (error) {
      console.error(`Error reading commands: ${error}`);
    }
  }
);
