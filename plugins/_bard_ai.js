const axios = require("axios");

module.exports = {
  name: 'bard',
  category: 'GPT AI',
  description: 'Search or ask anything using bard',
  async client(vorterx, m, { text, args, mime, quoted, connect }) {
    if (!text) {
      await connect('❌');
      return m.reply('_Please provide a search term._');
    }

    try {
      const response = await axios.get(`https://api.guruapi.tech/api/bard?${encodeURIComponent(text)}`);
      
      if (response && response.data) {
        const result = response.data;
        await connect('✅');
        m.reply(result);
      } else {
        await connect('❌');
        m.reply('_No result found for the given search term._');
      }
    } catch (error) {
      console.error('Error fetching data from the bard:', error);
      m.reply('_Error fetching data from the bard._');
    }
  },
};
