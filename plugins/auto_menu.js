const config = require('../config.js');

const allLogos = [...(config.LOGOS || []), ...(process.env.LOGOS ? process.env.LOGOS.split(',') : [])];
const doIndex = Math.floor(Math.random() * allLogos.length);
const getLogo = allLogos[doIndex];

const isImage = /\.(jpg|jpeg|png|gif)$/i.test(getLogo);
const mediaType = isImage ? 1 : 2;

module.exports = {
  async client(vorterx, m, { args,text }) {
    if (args && args.length > 0 && args[0] === 'menu2') {
      const fs = require('fs');
      const path = require('path');

      const pluginsPath = path.join(__dirname);
      const categories = {};

      fs.readdirSync(pluginsPath).forEach((file) => {
        const filePath = path.join(pluginsPath, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
          const categoryNum = Object.keys(categories).length + 1;
          const categoryKey = `1.${categoryNum}`;
          categories[categoryKey] = file;
        }
      });

      if (Object.keys(categories).length > 0) {
        const getMenu = `┌──『 *${process.env.BOTNAME}* 』──❖\n\n`;

        let menuNum = 1;
        const categoryText = Object.entries(categories).map(([key, value]) => {
          return `${menuNum++}. ${value} Menu`;
        }).join('\n');

        const menuString = `${getMenu}${categoryText}\n\n└─────────◉\n\n`;
        vorterx.sendMessage(m.from, {
          image: {[isImage ? 'image' : 'video']: {
            url: getLogo },
          text: `${menuString}Please reply to the number category below`,
        });  
        m.session.categories = categories;

      } else {
        vorterx.sendMessage(m.from, 'No category found sorry__');
      }

    } else if (m.session.categories) {
      const category = m.session.categories[args[0]];

      if (category) {
        const categoryPath = path.join(__dirname, category);
        const categoryCommands = fs.readdirSync(categoryPath);

        if (categoryCommands.length > 0) {
          const commandList = categoryCommands.map((commandFile) => {
            const commandInfo = require(path.join(categoryPath, commandFile));
            return `${commandInfo.name}: ${commandInfo.description}`;
          });

          const commandListString = commandList.join('\n');
          const categoryText = `┌──『 *${category}Menu* 』──❖\n\n${commandListString}\n\n└─────────◉\n\n`;

          vorterx.sendMessage(m.from, {
            image: { [isImage ? 'image' : 'video']: {
              url: getLogo},
            text: `${categoryText}Please reply to the number category below`,
          });

          delete m.session.categories;
        } else {
          vorterx.sendMessage(m.from, '__No commands found for this category__');
        }
      } else {
        vorterx.sendMessage(m.from, '___❌Invalid category number reply___');
      }
    } else {
      vorterx.sendMessage(m.from, 'Invalid command. Please use `menu2` to view the menu____❌');
    }
  }
};
