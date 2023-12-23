const axios = require('axios');
const config = require('../../config.js');
const fs = require('fs');

module.exports = {
  name: 'script',
  alias: ['sc'],
  category: 'Search',
  async client(vorterx, m, { text, args, connect }) {
   
  await connect('🌲');
  const v_chat = "https://i.ibb.co/k3tGtpf/360-F-426466645-EAg-Vxq-HG2-XK22-Ys2-Pm-LLPgml-EDC3-Sn3-X.jpg";
  const chat_v = "https://i.ibb.co/p0RmTf2/comdlpng6934979.jpg";
  let { data } = await axios.get('https://api.github.com/repos/Vorterx/Aztec-MD')
  let cap = `
  *乂 AZTEC-MD MD INFO 乂*
          
  *〄 _Stars*: ${data?.stargazers_count || "120+"  }
  
  *〄 _Forks*: ${data?.forks_count || "1000+"}
  
  *〄 _Name*: ${process.env.OWNER_NAME}
  
  *〄 _Updated_At*: ${new Date(data?.updated_at).toLocaleDateString()||"undefined"}
  
  *〄 _Scrip_URL*: ${data?.html_url}\n\n*${config.CAPTION}*

`;

 const chatBot = {
      image: {
        url: chat_v
      },
      caption: cap,
      headerType: 2,
      contextInfo: {
        externalAdReply: {
          title: `${config.CAPTION}`,
          body: 'ʙᴇsᴛ ᴛᴏ ᴜsᴇ',
          mediaType: 2,
          thumbnail: {
            url: v_chat
          },
          sourceUrl: 'wa.me/27686881509',
          mediaUrl: '',
        },
      },
    };

    await vorterx.sendMessage(m.from, chatBot, { quoted: m });
  }
};
