const axios = require("axios");

module.exports = {
  name: 'bard',
  category: 'GPT AI',
  description: 'Search or ask anything using bard',
  async client(vorterx, m, { args, mime, quoted, connect }) {
    if (!args[0]) {
      await connect('❌');
      return m.reply('_Please provide a search term or image._');
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
  async message(m, { connect }) {
    if (m.hasQuotedMsg && m.quotedMsg.type === 'image') {
      try {
        const img = m.quotedMsgObj.url;
        const text = encodeURIComponent(m.body);
        const res = await axios.get(`https://api.guruapi.tech/api/bardimg?text=${text}&image=${img}`);
        
        if (res && res.data) {
          const result = res.data.content;
          await connect('✅');
          m.reply(result);
        } else {
          await connect('❌');
          m.reply('_No result found for the given image and text._');
        }
      } catch (error) {
        console.error('Error from the bard with image:', error);
        await connect('❌');
        m.reply(`_Error fetching data from the bard with image: ${error.message}_`);
      }
    }
  },
};
