const axios = require('axios');

module.exports = {
  name: 'bard',
  category: 'Chat-Gpt',
  description: 'Use Bard AI for any information',
  async client(vorterx, m, { text, connect }) {
   
    if (!text) {
      await connect('❌');
      return m.reply(`Please provide a query. For example, use: \`\`\`What is the new update of WaBeta?\`\`\``);
    }
    try {
      await connect('🤖');
      const anu = await axios.get(`https://api.neoxr.eu/api/bard?q=${encodeURIComponent(text)}&apikey=bv1SpA`);      
      const { data } = anu;      
      if (data && data.success && data.message) {
        await vorterx.sendMessage(m.from, data.message, `${text}`, {
          quotedMessage: m,
          contextInfo: { forwardingScore: 999, isForwarded: true },
        });
      } else {
        await connect('❌');
        await m.reply('Failed to response sorry_');
      }
    } catch (error) {
      await connect('❌');
      await m.reply('An error occurred while processing_');
    }
  },
};
