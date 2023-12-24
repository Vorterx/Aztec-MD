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

    const chara = `https://api.caliph.biz.id/api/ai/c-ai?q=${encodeURIComponent(args)}&apikey=lykoUzNh`;

    try {
      const response = await fetch(chara);
      const result = await response.json();

      if (result.status === 'success' && result.data) {
        const get_success = JSON.stringify(result.data, null, 2);
        const img = 'https://i.imgur.com/mCTg8vq.jpg';

        await connect('🤖');
        return vorterx.sendMessage(m.from, { image: { url: img }, caption: `*CHARACTER AI*\n${get_success}` }, 'image');
      } else {
        await connect('❌');
        return m.reply(`\`\`\`Error: ${result.message || 'Unexpected error'}\`\`\``);
      }
    } catch (error) {
      console.error('Error:', error);
      await connect('❌');
      return m.reply(`\`\`\`An unexpected error occurred while processing the query...\`\`\``);
    }
  },
};
