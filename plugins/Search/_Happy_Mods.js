const { Zenith } = require('../../lib/functions');
const fetch = async (url) => import('node-fetch').then(module => module.default(url));

Zenith(
{
  usage: 'happy-mod',
  desc: 'To search happy mods',
  category: 'Search',
}, async (vorterx, m, react, { args }) => {

  if (!args) {
    await react('❌');
    return m.reply('*_Please provide a query_*');
  }

  var HAPP_MODS = `https://api.botcahx.eu.org/api/search/happymod?query=${args}&apikey=sjANGiU8`;

  try {
    await react('✳️');
    const res = await fetch(HAPP_MODS);
    const data = await res.json();

    if (data.status) {
      const results = data.result.slice(0, 15);
      results.forEach((mod, index) => {
        const title = mod.title;
        const icon = mod.icon;
        const link = mod.link;
        const rating = mod.rating;
        //---------------------[2024]---------------------------------------------------------------
        const MSG = `*Result* ${index + 1}:\n*Title*: ${title}\n*Link*: ${link}\n*Rating*: ${rating}\n`;
        
        vorterx.sendMessage(m.chat, { image: { url: icon }, caption: MSG });
      });
      
    } else {
      
      m.reply('*_No results found for the given query_*');
    }

  } catch (error) {
    
    console.error(error);
    m.reply('*_An error occurred while processing the request_*');
  }
});
