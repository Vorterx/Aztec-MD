const axios = require('axios');
const fs = require('fs');

module.exports = {
  name: 'script',
  alias: ['sc'],
  category: 'Search',
  async client(vorterx, m, { text, args, connect }) {
   
  await connect('🌲');
  let { data } = await axios.get('https://api.github.com/repos/Vorterx/Aztec-MD')
  let cap = `
  *乂 AZTEC-MD MD INFORMATION 乂*
          
  *〄 _Stars*: ${data?.stargazers_count || "120+"  }
  
  *〄 _Forks*: ${data?.forks_count || "1000+"}
  
  *〄 _Name*: ${process.env.OWNER_NAME}
  
  *〄 _Updated_At*: ${new Date(data?.updated_at).toLocaleDateString()||"undefined"}
  
  *〄 _Scrip_URL*: ${data?.html_url}
`;

m.reply(cap);
  }
}
