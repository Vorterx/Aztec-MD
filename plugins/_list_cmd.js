const fs = require('fs');
const path = require('path');

module.exports = {
  name: 'list',
  category: 'General',
  async client(vorterx, m, { args, text, connect }) {
    await connect('📝');

    const pluginsDir = path.join(__dirname);

    const commandFiles = fs.readdirSync(pluginsDir);

    const commandNames = [];

    commandFiles.forEach((file) => {
      const commandModule = require(path.join(pluginsDir, file));
      if (commandModule && commandModule.name) {
        commandNames.push(commandModule.name);
      }
    });

    let list_md = `
┌──『 *LIST CMDS* 』──❖\n\n`;

    commandNames.forEach((name, index) => {
      list_md += ` | ${index + 1} ${name}\n`;
    });

    list_md += '└─────────◉';

    m.reply(list_md);
  },
};
