const axios = require('axios');
const { Zenith } = require('../../lib/functions');

Zenith({
  usage: 'anime-quote',
  desc: 'Anime Quotes',
  category: 'Anime',
}, async (vorterx, m, react) => {
  await react('✔️');

  try {
    const res = await axios.get('https://api.lolhuman.xyz/api/random/quotesnime?apikey=5c250069e8936d6bf70295b8&language=en');
    const { quote, character, anime, episode } = res.data.result;

    const forQuote = `*Anime Quote:*\n${quote}\n\n*_Character_:* ${character}\n\n*_Anime_:* ${anime}\n\n*_Episode_:* ${episode}`;

    await vorterx.sendMessage(m.chat, forQuote);
  } catch (error) {
    console.error(error.message);
    m.reply('Please try again later');
  }
});      
