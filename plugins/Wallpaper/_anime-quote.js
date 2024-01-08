const axios = require('axios');
const { Zenith } = require('../../lib/functions');

Zenith({
  usage: 'anime-quote',
  desc: 'Anime Quotes',
  category: 'Anime',
}, async (vorterx, m, react) => {
  await react('✔️');

  try {
    const res = await axios.get('https://api.lolhuman.xyz/api/random/quotesnime?apikey=5c250069e8936d6bf70295b8');
    const { quote, character, anime, episode } = res.data.result;

    const forQuote = `*Anime Quote:*\n${quote}\n\n*Character:* ${character}\n*Anime:* ${anime}\n*Episode:* ${episode}`;

    await vorterx.sendMessage(m.chat, {text: forQuote});
  } catch (error) {
    console.error(error.message);

    m.reply('Failed to fetch anime quote. Please try again later');
  }
});
      
