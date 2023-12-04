const axios = require('axios');

module.exports = {
  name: 'ios',
  alias: ['apple'],
  category: 'Search',
  description: 'Shows information and updates about iOS',
  async connect(vorterx, m, { text, args, connect }) {
  
    try {
       await connect('🍏');  
      const response = await axios.get('https://vihangayt.me/details/ios');
      const data = response.data;
      const version = data.version;
      const updates = data.updates;
      const latestUpdate = updates[0];
      const company = data.company; 
      const thumbnailUrl = data.thumbnailUrl;

      let Ios_info = `*📱 iOS Information*\n`;
      Ios_info += `*📝 Title*: ${latestUpdate.title}\n`;
      Ios_info += `*🔖 Version*: ${version}\n`;
      Ios_info += `*📃 Description*: ${latestUpdate.description}\n`;
      Ios_info += `*📅 Date*: ${latestUpdate.date}\n\n`;
      Ios_info += `*🏢 Company*: ${company}\n`;
      Ios_info += `*🔗 URL*: ${latestUpdate.url}\n\n\n*_© WhatsApp CHATBOT_*`;

      vorterx.sendMessage(m.from, Ios_info, { thumbnail: thumbnailUrl });
     } catch (error) {
      console.error('Error:', error);
      m.reply('*An error occurred sorry*');
    }
  },
};
