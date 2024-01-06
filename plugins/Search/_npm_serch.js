const axios = require('axios');
const { Zenith } = require('../../lib/_cmd_sxntax.js');

Zenith(
  {
  usage: 'npm',
  alias: ['pkg'],
  category: 'Search',
  desc: 'Searches for an npm package',
  filename: __filename
  }, async (vorterx,m, react, {args}) => {
    
    if (!args) {
      await react('❌');
      return m.reply('_Please provide an npm package name, e.g., npm aztec-md-ytdl_');
    }
    try {
      const decentX = await axios.get(`http://registry.npmjs.com/-/v1/search?text=${args}`);
      const { objects: results } = decentX.data;
      if (!results.length) {
        await react('❌');
        return m.reply(`Your research for "${args}" not found :/`);
      }
      await react('🔍');
      const pkgInfo = results.map(async ({ package: pkg }) => {
        return `*🕹️_${pkg.name}*\n(v${pkg.version})\n*_🎗️Link*: _${pkg.links.npm}_\n*_📒Descripto*: _${pkg.description}_`;
      });
      const pkgE = await Promise.all(pkgInfo);
      const xtext = pkgE.join('\n\n');
      const master_publisher = results[0].package?.publisher;
      if (master_publisher && master_publisher.avatar) {
        const master_avatar = master_publisher.avatar;
        await vorterx.sendMessage(m.chat, { image: { url: master_avatar, caption: xtext, quoted: m } });
      } else {
        m.reply(xtext);
      }
    } catch (error) {
      console.error(error);
      m.reply('_An error occurred while searching for the npm package._');
    }
  });
