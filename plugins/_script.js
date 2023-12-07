const axios = require('axios');

module.exports = {
  name: 'script',
  alias: ['sc'],
  category: 'Search',
  async client(vorterx, m, { text, args, connect }) {
    await connect('🌲');
    try {
      const repoUrl = 'https://api.github.com/repos/Vorterx/Aztec-MD';
      const repoResponse = await axios.get(repoUrl);
      const repo = repoResponse.data;

      if (repo) {
        const gitMsg = `
        *乂 AZTEC-MD MD INFORMATION 乂*
        
        *〄 _Name*:    ${repo.name}
        
        * 〄 _Stars*:   ${repo.stargazers_count}
        
        *〄 _Forks*:    ${repo.forks_count}
        
        *〄 _License*:   ${repo.license?.name}
        
        *〄 _Updated_At*:  ${new Date(repo.updated_at).toLocaleDateString()}
        
        *〄 _Scrip_URL*: *${repo.html_url}*\n\n\n*WHATSAPP CHATBOT*
        `;
        const az_git = "https://i.ibb.co/fHZz1kV/2076264-200.png";
        vorterx.sendMessage(m.from, { url: az_git, caption: gitMsg }, { quoted: m });
      } else {
        m.reply('The repository data is not available.');
      }
    } catch (error) {
      console.error(error);
      m.reply('An error occurred while checking aztec md repo');
    }
  }
      }
