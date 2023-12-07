const axios = require('axios');

module.exports = {
  name: 'bard',
  category: 'GPT AI',
  async client(vorterx, m, { text, args, quoted, mime, connect }) {

    if(!text) {
      await connect('❌');
      return m.reply('Need query');
    }
    
    try {
      await connect('🐶');
      const res = await axios.post(`https://api.guruapi.tech/api/bard?text=${text} `, {
        text: text,
        args: args,
        quoted: quoted,
        mime: mime,
        connect: connect
      });
      const result = res.data;
      return m.reply(result);
    } catch (error) {
      console.error('Error occurred while making API request to Bard API:', error);
      m.reply('An error occurred while processing your request. Please try again later.');
    }
  }
};
