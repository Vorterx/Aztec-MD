const axios = require('axios');

module.exports = {
  name: 'bard',
  category: 'Chat-Gpt',
  description: 'Use Bard AI for any information',
  async xstart(vorterx, m, { text, xReact }) {
   
    if (!text) {
      await xReact('❌');
      return m.reply(`Please provide a query. For example, use: \`\`\`What is the new update of WaBeta?\`\`\``);
    }

    try {
      await xReact('🤖');
      const response = await axios.get(`https://api.neoxr.eu/api/bard?q=${encodeURIComponent(text)}&apikey=bv1SpA`);
      
      const { data } = response;
      
      if (data && data.success && data.message) {
        await vorterx.sendMessage(m.from, data.message, `${text}`, {
          quotedMessage: m,
          contextInfo: { forwardingScore: 999, isForwarded: true },
        });
      } else {
        await xReact('❌');
        await m.reply('Failed to response sorry_');
      }
    } catch (error) {
      await xReact('❌');
      await m.reply('An error occurred while processing_');
    }
  },
};
