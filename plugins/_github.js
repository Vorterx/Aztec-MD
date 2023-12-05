const axios = require('axios');

module.exports = {
  name: 'github',
  alias: ['git'],
  category: 'Search',
  async client(vorterx,m,{ text,args, connect}) {

    if(!text) {
      await connect('❌');
      return m.reply(`*Please provide a git user name e.g github DiegosonTech*`);
        }

        await connect('📊');
        try {
          const response = await axios.get(`https://api.github.com/users/${text}`);
          const { login, name, bio, followers, public_repos, following, blog, avatar_url } = response.data;

          const rezText8 = `
*乂 USER GUTHUB INFORMTN 乂*
_👤 Username:_ *${login}*
_👤 Name:_ *${name || 'N/A'}*
_👩‍💻 Bio:_ *${bio || 'N/A'}*
_🐌 Followers:_ *${followers}*
_🌷 Public Repos:_ *${public_repos}*
_👥 Following:_ *${following}*
_📌 Website:_ ${blog || 'N/A'}
`;

          const userRepos = await axios.get(`https://api.github.com/users/${text}/repos`);
          const repoNames = userRepos.data.map(repo => repo.name);
          const repoList = repoNames.join('\n');

          vorterx.sendMessage(m.from, { image: { url: avatar_url, mimetype: 'image/jpeg' }, caption: rezText8 + '\n\n*📚 Repositories:*\n' + repoList }, { quoted: m });
              } catch (error) {
                console.error(error);
             m.reply('An error occurred');
        }
}
}
