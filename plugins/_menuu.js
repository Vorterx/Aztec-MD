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

      const categoryFolders = fs.readdirSync(pluginsPath, { withFileTypes: true })
        .filter(file => file.isDirectory())
        .map(folder => path.join(pluginsPath, folder.name)); 

      for (const categoryPath of categoryFolders) {
        console.log('Checking category folder:', categoryPath);

        const jsFiles = fs.readdirSync(categoryPath)
          .filter(file => file.endsWith('.js'))
          .map(file => path.join(categoryPath, file));

        for (const filePath of jsFiles) {
          console.log('Checking command file:', filePath);

          try {
            const fileContent = fs.readFileSync(filePath, 'utf8');
            const commandInfoMatch = fileContent.match(/Zenith\(([\s\S]*?)\);/);

            if (commandInfoMatch) {
              const commandInfoString = commandInfoMatch[1];
              const commandInfo = new Function(`return ${commandInfoString}`)();

              if (commandInfo && commandInfo.usage) {
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
          } catch (error) {
            console.error(`Error reading or processing command file ${filePath}: ${error}`);
          }
        }
      }

      if (messageToSend !== '') {
        vorterx.sendMessage(m.chat, messageToSend, { quoted: m });
      } else {
        console.log('No commands found to display.');
      }

    } catch (error) {
      console.error(`Error sending the menu: ${error}`);
    }
  }
);
      
