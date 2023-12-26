const axios = require("axios");

module.exports = {
  name: 'bard',
  category: 'GPT AI',
  description: 'Search or ask anything using Bard',
  async client(vorterx, m, { args, connect }) {
    try {
      await connect('🔍');

      if (m.hasQuotedMsg && m.quotedMsg.type === 'image') {
        const img = m.quotedMsgObj.mimetype === 'image/jpeg' || m.quotedMsgObj.mimetype === 'image/png'
          ? await vorterx.downloadMediaMessage(m.quotedMsgObj)
          : m.quotedMsgObj.url;

        const res = await axios.get(`https://api.guruapi.tech/api/bardimg?text=${encodeURIComponent(args.join(' '))}&image=${encodeURIComponent(img)}`);
        
        if (res && res.data && res.data.content) {
          m.reply(res.data.content);
        } else {
          await connect('❌');
          m.reply('_No result found for the given image and text._');
        }
      } else {
        if (!args[0]) {
          await connect('❌');
          return m.reply('_Please provide a search term._');
        }

        const res = await axios.get(`https://api.guruapi.tech/api/bard?text=${encodeURIComponent(args[0])}`);
        
        if (res && res.data && res.data.content) {
          m.reply(res.data.content);
        } else {
          await connect('❌');
          m.reply('_No result found for the given search term._');
        }
      }
    } catch (error) {
      console.error('Error from the Bard:', error);
      await connect('❌');
      m.reply(`_Error fetching data from the Bard: ${error.message}_`);
    }
  },
};
                                                                                                                                                
