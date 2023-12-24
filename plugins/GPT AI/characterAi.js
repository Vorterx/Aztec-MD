/*
* @Author: DiegosonTech
* @BotName: Aztec-MD
*/

const fetch = async (url) => import('node-fetch').then(module => module.default(url));
const config = require('../../config.js');

module.exports = { 
  name: "character", 
  category: "GPT AI", 
  async client(vorterx, m, { args, connect, mime }) {
   
    if (!args) {
      await connect('❌');
      return m.reply(`\`\`\`Please provide a query, e.g., character how are you...\`\`\``);
    }
   const chara= `https://api.caliph.biz.id/api/ai/c-ai?q=${encodeURIComponent(args)}&apikey=lykoUzNh`;

    const anu = await fetch(chara);
    const final = await anu.json();

    if (final.status === 'success' && final.data) {
       const get_success = JSON.stringify(final.data, null, 2);
      const img = 'https://i.imgur.com/mCTg8vq.jpg';

        await connect('🤖');
     return vorterx.sendMessage(m.from, { image: { url: img }, caption: `*CHARACTER AI*\n${get_success}` }, 'image');
    } else {
      await connect('❌');
      return m.reply(`\`\`\`Error: ${final.message || 'Unexpected error'}\`\`\``);
    }
  },
};
    
