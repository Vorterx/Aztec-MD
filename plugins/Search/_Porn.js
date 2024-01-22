const { Zenith } = require('../../lib/functions');

Zenith({ 
  usage: 'porn',
  desc: '18+',
  category: 'Downloads',
}, async (vorterx, m, react, { args }) => {

  if (!args) {
    await react('❌');
    return m.reply('Provide a query');
  }

  var PORN = `https://api.botcahx.eu.org/api/search/pornhub?query=${args}&apikey=sjANGiU8`;

  try {
      await react('✳️');
    const res = await fetch(PORN);
    const result = await res.json();

    if (result.status && result.result.length > 0) {
      const maxR = Math.min(result.result.length, 18);

      let message = '';
      for (let i = 0; i < maxR; i++) {
        const cure = result.result[i];
        message += `
#${i + 1}
*Title*: ${cure.title}
*Duration*: ${cure.duration}
*URL*: ${cure.url}
*Viewers*: ${cure.viewers}
*Rating*: ${cure.rating}
*Published*: ${cure.published}\n`;
      }

      vorterx.sendMessage(m.chat, { text: message}, { quoted: m });

    } else {
        
      m.reply('*_No results found_*');
    }
  } catch (error) {
      
    console.error(error);
    m.reply('*_E3RR DUDE_*');
  }
});
