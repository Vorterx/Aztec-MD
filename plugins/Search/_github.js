const axios = require('axios');
const config = require('../../config.js');
const { Zenith } = require ('../../lib/_cmd_sxntax.js');

Zenith(
  {
  usage: 'github',
  alias: ['git'],
  category: 'Search',
  filename: __filename
  }, async (vorterx, coax, args, react) => {
   
    if (!args) {
      await react('❌');
      return coax.reply(`*Please provide a git user name e.g github DiegosonTech*`);
    }
    await react('📊');
    try {
      const res = await axios.get(`https://api.github.com/users/${args}`);
      const { login, name, bio, followers, public_repos, following, blog, avatar_url } = res.data;

      const rezText8 = `
*乂 USER GITHUB INFO 乂*
👤Username:_ *${login}*
👤Name:_ *${name || 'N/A'}*
👩‍💻Bio:_ *${bio || 'N/A'}*
🐌Followers:_ *${followers}*
🌷Public Repos:_ *${public_repos}*
👥Following:_ *${following}*
📌Website:_ ${blog || 'N/A'}\n\n*${config.CAPTION}*
`;

      const userRepos = await axios.get(`https://api.github.com/users/${args}/repos?per_page=2`);
      const repoNames = userRepos.data.map(repo => repo.name);
      const repoList = repoNames.join('\n');

      vorterx.sendMessage(coax.from, { image: { url: avatar_url, mimetype: 'image/jpeg' }, caption: rezText8 + '\n\n*📚 Repositories:*\n' + repoList }, { quoted: coax });
    } catch (error) {
      console.error(error);
      coax.reply('An error occurred');
    }
  });
