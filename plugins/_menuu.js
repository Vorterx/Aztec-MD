const { Zenith } = require('../lib/functions');
const fs = require('fs');
const path = require('path');

const prefix = process.env.PREFIX || 'default-prefix';

Zenith(
  {
    usage: 'menu',
    desc: 'To get all the commands',
    category: 'Mics',
  }, 
  async (vorterx, m, react, { args }) => {
    await react('🌀');

    const pluginsPath = path.join(__dirname);
    let messageToSend = '';

    try {
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

      const commandFiles = fs.readdirSync(pluginsPath, { withFileTypes: true })
        .filter(file => file.isDirectory())
        .flatMap(category => {
          const categoryPath = path.join(pluginsPath, category.name);
          return fs.readdirSync(categoryPath)
            .filter(file => file.endsWith('.js'))
            .map(file => path.join(categoryPath, file));
        });

      for (const filePath of commandFiles) {
        const commandModule = require(filePath);
        
        if (commandModule && commandModule.Zenith) {
          const commandInfo = commandModule.Zenith;

          if (commandInfo.usage) {
            if (messageToSend === '') {
              messageToSend += `
${menuDesign.header.left}${menuDesign.header.right}
*NAME*: ${m.pushName}
*PREFIX*: ${prefix}
${menuDesign.header.down}`;
            }

            messageToSend += `
${menuDesign.body.left}${menuDesign.body.up}『${commandInfo.category || 'Uncategorized'}』${menuDesign.body.right}
${menuDesign.body.down} ${commandInfo.usage}`;
          }
        }
      }

      if (messageToSend !== '') {
        vorterx.sendMessage(m.chat, messageToSend, { quoted: m });
      } else {
        console.log('No commands found to display.');
      }

    } catch (error) {
      console.error(`Error the cmds: ${error}`);
    }
  }
);
        
