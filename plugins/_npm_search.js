const axios = require('axios');

module.exports = {
  name: 'npm',
  alias: ['pkg'],
  description: 'Searches for an npm package',
  async xstart(vorterx, m, { text }) {
    if (!text) {
      await xReact('❌');
      return m.reply('_Please provide an npm package name, e.g., npm aztec-md-ytdl_');
    }

    try {
      const response = await axios.get(`http://registry.npmjs.com/-/v1/search?text=${text}`);
      const { objects: results } = response.data;

      if (!results.length) {
        await xReact('❌');
        return m.reply(`Your research for "${text}" not found :/`);
      }

        await xReact('🔍');
        const packageInfo = results.map(async ({ package: pkg }) => {
        const pkgRply = await axios.get(`https://registry.npmjs.com/${pkg.name}`);
        const { time } = pkgRply.data;

        const publishedDate = time[pkg.version];
        const formattedPublishedDate = new Date(publishedDate).toLocaleDateString();

        return `*🕹️_${pkg.name}*\n(v${pkg.version})\n*_🎗️Link*: _${pkg.links.npm}_\n*_📒Descripto*: _${pkg.description}_\n*_📇Published*: _${formattedPublishedDate}_`;
      });

      const packageInfor = await Promise.all(packageInfo);
      const xtext = packageInfor.join('\n\n');
      const master_avatar = results[0].package?.publisher?.avatar;
      if (master_avatar) {
        await vorterx.sendMessage(m.from, { image: { url: master_avatar,
        caption: xtext, quoted: m,  }, });
      } else {
        m.reply(xtext);
      }
    } catch (error) {
      console.error(error);
      m.reply('_An error occurred while searching for the npm package._');
    }
  },
};
