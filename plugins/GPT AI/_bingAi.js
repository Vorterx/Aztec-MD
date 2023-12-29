const fetch = async (url) => (await import('node-fetch')).default(url);
const { getBuffer } = require('../../lib/_getBuffer.js');

Zenith (
  {
  usage: 'bing',
  alias: ['bang'],
  desc: 'To search',
  filename: __filename
  }, async (vorterx, coax, args, react) => {
    try {
      if (!args) {
        await react('❌');
        return coax.reply('Please provide a query, e.g., `bing hello how are you`');
      }
      await react('💡');
      const aztec_api = 'xTnfXtBK';
      const API_BING = `https://api.betabotz.eu.org/api/search/bing-chat?text=${encodeURIComponent(args)}&apikey=${aztec_api}`;
      const res = await fetch(API_BING);

      if (!res.ok) {
        return coax.reply(`${res.status}`);
      }
      const data = await res.json();
      if (data && data.status && data.message) {
        const get_results = data.message;

        vorterx.sendMessage(coax.from, {
          text: get_results,
          contextInfo: {
            externalAdReply: {
              title: "BING GPT",
              body: args,
              mediaType: 1,
              thumbnail: await getBuffer("https://i.ibb.co/4R5Ftk2/download.jpg"),
              mediaUrl: "https://i.ibb.co/4R5Ftk2/download.jpg",
              sourceUrl: '',
            },
          },
        });
      } else {
        await react('❌');
        coax.reply('No Bing chat response found for the given query.');
      }
    } catch (error) {
      coax.reply(error.message);
    }
  });
                                                                                                   
