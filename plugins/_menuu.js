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
    let messageToSend = `
┏╼╾╼╾╼『BotName』╾╼⦿
| *NAME*: BtName
| *PREFIX*: ${prefix || '!'}
| *OWNER*: Owner
| *FROM*: Earth
┗╼╾╼╾╼╼╾╼╾╼╼╾╼╾╼⦿

`;

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
          const matches = fileContent.match(/Zenith\(([\s\S]*?)\);/g);

          if (matches) {
            for (const match of matches) {
              try {
                const commandInfo = new Function(`return ${match}`)();
                console.log('Processed command info:', commandInfo);

                if (commandInfo && commandInfo.usage) {
                  messageToSend += `
┌─╾╼╼『${commandInfo.category || 'Uncategorized'}』╾╼❖
│ ╰─ ${commandInfo.usage}
╰───◉`;
                }
              } catch (error) {
                console.error(`Error processing command info: ${error}`);
              }
            }
          }
        } catch (error) {
          console.error(`Error reading or processing command file ${filePath}: ${error}`);
        }
      }
    }

    
    vorterx.sendMessage(m.chat, messageToSend, { quoted: m });
  }
);
  
