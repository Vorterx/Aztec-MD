const axios = require('axios');
const fs = require('fs');
let repoData = null;

module.exports = {
  name: 'script',
  alias: ['sc'],
  category: 'Search',
  async client(vorterx, m, { text, args, connect }) {
    await connect('🌲');
  const az_git = fs.readFileSync("../lib/images/aztec_github.png");
  
    try {  
      if (repoData) {
        const repo = repoData;
        const gitMsg = `
        *乂 AZTEC-MD MD INFORMATION 乂*
        
        *〄 _Name*:    ${repo.name}
        
        * 〄 _Stars*:   ${repo.stargazers_count}
        
        *〄 _Forks*:    ${repo.forks_count}
        
        *〄 _License*:   ${repo.license?.name}
        
        *〄 _Updated_At*:  ${new Date(repo.updated_at).toLocaleDateString()}
        
        *〄 _Scrip_URL*: *${repo.html_url}*\n\n\n*WHATSAPP CHATBOT*
        `;
        await vorterx.sendMessage(m.from, {image: { url: az_git}, caption: gitMsg}, { quoted: m });
      } else {
        const repoUrl = 'https://api.github.com/repos/Vorterx/Aztec-MD';
        const repoResponse = await axios.get(repoUrl);
        const repo = repoResponse.data;

        if (repo) {
          repoData = repo;

          const gitMsg = `
          *乂 AZTEC-MD MD INFORMATION 乂*
          
          *〄 _Name*:    ${repo.name}
          
          * 〄 _Stars*:   ${repo.stargazers_count}
          
          *〄 _Forks*:    ${repo.forks_count}
          
          *〄 _License*:   ${repo.license?.name}
          
          *〄 _Updated_At*:  ${new Date(repo.updated_at).toLocaleDateString()}
          
          *〄 _Scrip_URL*: *${repo.html_url}*\n\n\n*WHATSAPP CHATBOT*
          `;
        await vorterx.sendMessage(m.from, {image:{ url: az_git}, caption: gitMsg}, { quoted: m });
        } else {
          await m.reply('The repository data is not available.');
        }
      }
    } catch (error) {
      console.error(error);
      await m.reply('An error occurred while checking aztec md repo');
    }
  }
                          }
