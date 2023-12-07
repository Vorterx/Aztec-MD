const axios = require('axios');
const fs = require('fs');


module.exports = {
  name: 'script',
  alias: ['sc'],
  category: 'Search',
  async client(vorterx, m, { text, args, connect }) {
    await connect('🌲');
  let { data } = await axios.get('https://api.github.com/repos/SuhailTechInfo/Suhail-Md')
        let cap = `
I'm Suhail-Md. A whatsApp chuddy buddy bot with rich features, Created By *${process.env.OWNER_NAME}*. 🔰\n
  *❲❒❳ Stars:* ${data?.stargazers_count || "120+"  } stars
  *❲❒❳ Forks:* ${data?.forks_count || "1000+"} forks
  *❲❒❳ Auther:* SuhailTechInfo
  *❲❒❳ Create:* ${data?.created_at||"undefined"}
  *❲❒❳ Repo:* _https://github.com/SuhailTechInfo/Suhail-Md_

  *❲❒❳ Visit For Tutorial* _https://www.Youtube.com/c/SuhailTechInfo_

`;

m.reply(cap);
  }
}
