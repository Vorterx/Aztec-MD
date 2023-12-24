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

    let apiUrl;
    const testApiUrl = `https://api.caliph.biz.id/api/ai/c-ai?q=test&apikey=lykoUzNh`;
    
      try {
      const testResponse = await fetch(testApiUrl);
      const testResult = await testResponse.json();

      if (testResult.status === 'success') {
    
        apiUrl = `https://api.caliph.biz.id/api/ai/c-ai?q=${encodeURIComponent(args)}&apikey=lykoUzNh`;
      } else {
        apiUrl = `https://api.caliph.biz.id/api/ai/c-ai?char=${encodeURIComponent(args)}&apikey=lykoUzNh`;
      }
    } catch (testError) {
      console.error('Error testing API:', testError);
      await connect('❌');
      return m.reply(`\`\`\`An unexpected error occurred while testing the API...\`\`\``);
    }

    try {
      const response = await fetch(apiUrl);
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
