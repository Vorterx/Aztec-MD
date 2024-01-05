const axios = require('axios');
const config = require('../../config.js');
const { getBuffer } = require('../../lib/_getBuffer.js');
const fs = require('fs');
const { Zenith } = require ('../../lib/_cmd_sxntax.js');

Zenith( 
   {
  usage: 'script',
  alias: ['sc'],
  category: 'Search',
  desc: 'To get script',
  filename: __filename
}, async (vorterx, m, react) => {
   
  await react('🌲');
  const v_chat = "https://i.ibb.co/k3tGtpf/360-F-426466645-EAg-Vxq-HG2-XK22-Ys2-Pm-LLPgml-EDC3-Sn3-X.jpg";
  const chat_v = "https://i.ibb.co/p0RmTf2/comdlpng6934979.jpg";
  let { data } = await axios.get('https://api.github.com/repos/Vorterx/Aztec-MD')
  let cap = `
  *乂 AZTEC-MD MD INFO 乂*
          
  *〄Stars*: ${data?.stargazers_count || "120+"  }  
  *〄Forks*: ${data?.forks_count || "1000+"} 
  *〄Name*: ${process.env.OWNER_NAME} 
  *〄Scrip*: ${data?.html_url}\n\n*${config.CAPTION}*
`;

 const chatBot = {
      image: {
        url: chat_v
      },
      caption: cap,
      headerType: 2,
      contextInfo: {
        forwardingScore: 5,
        isForwarded:true,
        externalAdReply: {
          title: `${config.CAPTION}`,
          body: 'ʙᴇsᴛ ᴛᴏ ᴜsᴇ',
          mediaType: 2,
          thumbnail: await getBuffer(v_chat),
          sourceUrl: 'wa.me/27686881509',
          mediaUrl: '',
        },
      },
    };

    await vorterx.sendMessage(m.chat, chatBot, { quoted: chat });
  });
