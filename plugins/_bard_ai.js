const axios = require("axios");

module.exports = {
  name: 'bard',
  category: 'GPT AI',
  description: 'Search or ask anything using bard',
  async client(vorterx, m, { args, mime, quoted, connect }) {
    
    if (!args[0]) {
      await connect('❌');
      return m.reply('_Please provide a search term._');
    }

    const text = args[0];
    console.log(text);

    try {
      const res = await axios.get(`https://api.guruapi.tech/api/bard?text=${encodeURIComponent(text)}`);
      
      if (res && res.data) {
        const result = res.data.content;
        await connect('✅');
        m.reply(result);
      } else {
        await connect('❌');
        m.reply('_No result found for the given search term._');
      }
    } catch (error) {
      console.error('Error from the bard:', error);
      await connect('❌');
      m.reply(`_Error fetching data from the bard: ${error.message}_`);
    }
  },
};
