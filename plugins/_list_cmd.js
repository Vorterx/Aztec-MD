const fs = require('fs');
const { tiny } = require('@viper-x/fancytext');
const path = require('path');

module.exports = {
  name: 'list',
  category: 'General',
  async client(vorterx, m, { args, text, connect }) {
    await connect('📝');
    const pluginsDir = path.join(__dirname);
    const commandFiles = fs.readdirSync(pluginsDir);
    const commandCategories = {};
    let categoryToFetch = text.toLowerCase(); // Assuming the user input is the category name

    commandFiles.forEach((file) => {
      const commandModule = require(path.join(pluginsDir, file));
      if (commandModule && commandModule.name && commandModule.category) {
        const categoryName = commandModule.category.toLowerCase();
        if (!commandCategories[categoryName]) {
          commandCategories[categoryName] = [];
        }
        commandCategories[categoryName].push(commandModule.name);
      }
    });

    if (!isNaN(categoryToFetch)) {
      const categoryIndex = Number(categoryToFetch) - 1;
      const categories = Object.keys(commandCategories);
      if (categoryIndex >= 0 && categoryIndex < categories.length) {
        categoryToFetch = categories[categoryIndex];
      } else {
        m.reply('Invalid category number');
        return;
      }
    }

    let list_md = `
┌──『 *${process.env.BOTNAME}* 』──❖\n\n`;

    const commands = commandCategories[categoryToFetch];
    if (commands) {
      commands.forEach((name, index) => {
        list_md += ` | ${index + 1}. ${name}\n`;
      });
    } else {
      list_md += 'No commands found for the specified category';
    }

    list_md += '\n└─────────◉';

    m.reply(tiny(list_md));
  },
};
