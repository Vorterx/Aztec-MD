const fetch = require('node-fetch');

module.exports = { 
  name: "character", 
  category: "GPT AI", 
  async client(vorterx, m, { text, args, connect, mime }) {
   
    if (!text) {
      await connect('❌');
      return m.reply(`\`\`\`Please provide a query, e.g., character how are you...\`\`\``);
    }

    const ai_chactr = `https://api.caliph.biz.id/api/ai/c-ai?q=${text}&apikey=lykoUzNh`;

    const res = await fetch(ai_chactr);
   if (!res.ok) {
      console.error(`Error: ${res.status}`);
      await connect('❌');
      return m.reply('An error occurred while processing...');
    }

     await connect('🤡');
    const data = await res.json();
      console.log(data);
    const gpt_mime = 'URL_TO_YOUR_THUMBNAIL_IMAGE';
    return m.reply({
      content: `*CHARACTER*: ${data.result}`,
      thumbnail: { url: gpt_mime }
    });
  }
};
