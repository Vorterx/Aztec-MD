const fs = require('fs');
const path = require('path');

module.exports = {
  name: 'list',
  category: 'General',
  async client(vorterx, m, { args, text, connect }) {
    await connect('📝');

    const pluginsDir = path.join(__dirname, '..');
    const configPath = path.join(__dirname, '../config.js'); 

    const commandFiles = fs.readdirSync(pluginsDir);

    const commandNames = commandFiles.map((file, index) => {
      const commandModule = require(path.join(pluginsDir, file));
      return `${index + 1} ${commandModule.name}`;
    });

    let list_md = `
    ┌──『 *LIST CMDS* 』──❖\n\n`;

    commandNames.forEach((name) => {
      list_md += ` | ${name}\n`;
    });

    list_md += ' └─────────◉';

    m.reply(list_md);
  }
}; 
