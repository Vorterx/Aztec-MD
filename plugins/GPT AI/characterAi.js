/*
* @Author: DiegosonTech
* @BotName: Aztec-MD
*/

const fetch = async (url) => import('node-fetch').then(module => module.default(url));
const config = require('../../config.js');

module.exports = { 
  name: "character", 
  category: "GPT AI", 
  async client(vorterx, m, {  args, connect, mime }) {
   
    if (!args) {
      await connect('❌');
      return m.reply(`\`\`\`Please provide a query, e.g., character how are you...\`\`\``);
    }

    const ai_chactr = `https://api.caliph.biz.id/api/ai/c-ai?q=${args}&apikey=lykoUzNh`;

    const res = await fetch(ai_chactr);

    if (!res.ok) {
      console.error(`Error: ${res.status}`);
      await connect('❌');
      return m.reply('An error occurred while processing...');
    }

    await connect('🤡');
    const data = await res.json();
    console.log(data);

    const gpt_mime = 'https://i.imgur.com/mCTg8vq.jpg';
    return m.reply({
      thumbnail: { url: gpt_mime },
      content: `*CHARACTER*: ${data.result}\n\n*${config.CAPTION}*`
    });
  }
};
