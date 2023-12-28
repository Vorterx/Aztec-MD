const axios = require('axios');
const config = require('../../config.js');

module.exports = {
  name: 'github',
  alias: ['git'],
  category: 'Search',
  async client(vorterx, m, { args, connect }) {
    if (!args) {
      await connect('❌');
      return m.reply(`*Please provide a git user name e.g github DiegosonTech*`);
    }

    await connect('📊');
    try {
      const response = await axios.get(`https://api.github.com/users/${args}`);
      const { login, name, bio, followers, public_repos, following, blog, avatar_url } = response.data;

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

      vorterx.sendMessage(m.from, { image: { url: avatar_url, mimetype: 'image/jpeg' }, caption: rezText8 + '\n\n*📚 Repositories:*\n' + repoList }, { quoted: m });
    } catch (error) {
      console.error(error);
      m.reply('An error occurred');
    }
  }
};
