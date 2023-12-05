const axios = require('axios');

module.exports = {
  name: 'npm',
  alias: ['pkg'],
  category: 'Search',
  description: 'Searches for an npm package',
  async client(vorterx, m, { text, connect }) {
 
    if (!text) {
      await connect('❌');
      return m.reply('_Please provide an npm package name, e.g., npm aztec-md-ytdl_');
    }
    try {
      const decentX = await axios.get(`http://registry.npmjs.com/-/v1/search?text=${text}`);
      const { objects: results } = decentX.data;
      if (!results.length) {
        await connect('❌');
        return m.reply(`Your research for "${text}" not found :/`);
      }
        await connect('🔍');
        const pkgInfo = results.map(async ({ package: pkg }) => {
        const pkgRply = await axios.get(`https://registry.npmjs.com/${pkg.name}`);
        const { time } = pkgRply.data;
        const datPkg = time[pkg.version];
        const datePkg = new Date(datePkg).toLocaleDateString();
        return `*🕹️_${pkg.name}*\n(v${pkg.version})\n*_🎗️Link*: _${pkg.links.npm}_\n*_📒Descripto*: _${pkg.description}_\n*_📇Published*: _${datePkg}_`;
      });
      const pkgE = await Promise.all(pkgInfo);
      const xtext = pkgE.join('\n\n');
      const master_avatar = results[0].package?.publisher?.avatar;
      if (master_avatar) {
        await vorterx.sendMessage(m.from, { image: { url: master_avatar, caption: xtext, quoted: m,  }, });
      } else {
        m.reply(xtext);
      }
    } catch (error) {
      console.error(error);
      m.reply('_An error occurred while searching for the npm package._');
    }
  },
};
