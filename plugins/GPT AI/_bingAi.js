const fetch = async (url) => (await import('node-fetch')).default(url);
const { getBuffer } = require('../../lib/_getBuffer.js');

module.exports = {
  name: 'bing',
  alias: ['bang'],
  async client(vorterx, m, { args, connect }) {
    try {
      if (!args) {
        await connect('❌');
        return m.reply('Please provide a query, e.g., `bing hello how are you`');
      }

      await connect('💡');

      const aztec_api= 'xTnfXtBK';
      const API_BING = `https://api.betabotz.eu.org/api/search/bing-chat?text=${encodeURIComponent(args)}&apikey=${aztec_api}`;
      const res= await fetch(API_BING);
 
      if (!res.ok) {
        return m.reply(`${res.status}`);
      }
      const data = await res.json();
        console.log(data);
   if (data && data.result && data.result.length > 0) {
        const get_results = data.result[0].response;

        vorterx.sendMessage(m.from, {
          text: get_results,
          contextInfo: {
            externalAdReply: {
              title: "BING GPT",
              body: args,
              mediaType: 1,
              thumbnail: await getBuffer("https://i.ibb.co/4R5Ftk2/download.jpg"), // Placeholder image URL
              mediaUrl: "https://i.ibb.co/4R5Ftk2/download.jpg", // Placeholder image URL
              sourceUrl: '',
            },
          },
        });
      } else {
        await connect('❌');
        m.reply('No Bing chat response found for the given query.');
      }
    } catch (error) {
      m.reply(error.message);
    }
  }
};
