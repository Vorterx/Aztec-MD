const axios = require('axios');

let chatbotEnabled = true;

module.exports = {
  async client(vorterx, m, { text, args, connect, mentionByTag }) {
    if (chatbotEnabled) {
      const budy = text;
      const sender = m.quoted ? m.quoted.sender : mentionByTag[0];
      
      switch (budy.toLowerCase()) {
        case 'what is your name':
          await m.reply("I'm Aztec MD made by Vorterx Team");
          break;
        default:
          const apiUrl = `http://api.brainshop.ai/get?bid=172352&key=vTmMboAxoXfsKEQQ&msg=${encodeURIComponent(budy)}&uid=${encodeURIComponent(sender)}`;
          
          try {
            const response = await axios.get(apiUrl);
            const data = response.data;
            
            const reply = data.cnt || "I'm sorry, I couldn't understand that";
            await m.reply(reply);
          } catch (error) {
            console.error('Error:', error);
          }
          break;
      }
    } else {
      await connect('😪');
      await m.reply('__😪Chatbot is currently disabled by the owner__');
    }
  },

  chatbotOn: async function(vorterx, m, { text, args, xReact }) {
    if (process.env.MODS.includes(m.sender)) {
      if (args[0] === 'on') {
        chatbotEnabled = true;
        await connect('🤠');
        await m.reply('__🤠Chatbot is now enabled__');
      }
    } else {
      await connect('❌');
      await m.reply('__❌Only mods can enable the chatbot__');
    }
  },

  chatbotOff: async function(vorterx, m, { text, args, xReact }) {
    if (process.env.MODS.includes(m.sender)) {
      if (args[0] === 'off') {
        chatbotEnabled = false;
        await connect('🔋');
        await m.reply('__😪Chatbot is now disabled by the owner__');
      }
    } else {
      await connect('❌');
      await m.reply('__❌Only mods can disable the chatbot__');
    }
  }
};
