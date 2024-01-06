const { Zenith } = require('../lib/functions');
const fs = require('fs');
const path = require('path');

const prefix = process.env.PREFIX;

Zenith(
  {
    usage: 'menu',
    desc: 'To get all the commands',
    category: 'Mics',
  }, 
  async (vorterx, m, react, { args }) => {
    await react('🌀');

    const pluginsPath = path.join('plugins');
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

for (const categoryPath of categoryFolders) {
  console.log('Checking category folder:', categoryPath);
  
  const jsFiles = fs.readdirSync(categoryPath)
    .filter(file => file.endsWith('.js'))
    .map(file => path.join(process.cwd(), categoryPath, file)); 

  for (const filePath of jsFiles) {
    console.log('Checking command file:', filePath);

    const commandModule = require(filePath);

    if (commandModule && commandModule.Zenith) {
      console.log('Command Module:', commandModule);

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
}
      if (messageToSend !== '') {
        vorterx.sendMessage(m.chat, messageToSend, { quoted: m });
      } else {
        console.log('No commands found to display.');
      }

    } catch (error) {
      console.error(`Error ending the menu: ${error}`);
    }
  }
);
      
