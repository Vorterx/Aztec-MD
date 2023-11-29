const axios = require('axios');

module.exports = {
  name: 'wabeta',
  alias: ['whatsapp'],
  category: 'Search',
  description: 'Shows information and updates about wabetainfo',
  async xstart(vorterx, m, { text, args, xReact }) {
    
    try {
      await xReact('📝');
      const response = await axios.get('https://vihangayt.me/details/wabetainfo');
      const data = response.data;
      const version = data.version;
      const updates = data.updates;
      const latestUpdate = updates[0];
      const company = data.company; 
      
      let Beta_info = `*📱 WABetaInfo UpdatesNews*\n`;
      Beta_info += `*📝 Title*: ${latestUpdate.title}\n\n`;
      Beta_info += `*🔖 Version*: ${version}\n`;
      Beta_info += `*📢 Latest Update*:\n\n`;
      Beta_info += `*📃 Description*: ${latestUpdate.description}\n`;
      Beta_info += `*📅 Date*: ${latestUpdate.date}\n\n`;
      Beta_info += `*🏢 Company*: ${company}\n`;
      Beta_info += `*🔗 URL*: ${latestUpdate.url}\n\n\n*_© WhatsApp CHATBOT_*`;
      
      vorterx.sendMessage(m.from, { image: { url: latestUpdate.thumbnail }, caption: Beta_info }, {quoted: m});
    } catch (error) {
      console.error('Error:', error);
      m.reply('_An error occurred sorry_');
    }
 },
};
