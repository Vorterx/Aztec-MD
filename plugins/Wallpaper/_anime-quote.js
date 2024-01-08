const axios = require('axios');
const { Zenith } = require('../../lib/functions');

Zenith({
  usage: 'anime-quote',
  desc: 'Anime Quotes',
  category: 'Anime',
}, async (vorterx, m, react) => {
  await react('✔️');

  let cmd = "https://i.imgur.com/oGX8YvH.jpg";

  try {
    const res = await axios.get('https://api.lolhuman.xyz/api/random/quotesnime?apikey=GataDios');
    
    if (res && res.data && res.data.status === 200) {
      const { quote, character, anime, episode } = res.data.result;
      const formattedQuote = `*Anime Quote:*\n${quote}\n\n*_Character_:* ${character}\n\n*_Anime_:* ${anime}\n\n*_Episode_:* ${episode}`;

      await vorterx.sendMessage(m.chat, { image: { url: cmd }, caption: formattedQuote });
    } else {
      console.error('Error fetching anime quote:', res && res.data && res.data.message);
      m.reply('Failed to fetch anime quote. Please try again later.');
    }
  } catch (error) {
    console.error('Error during API request:', error.message);
    m.reply('Failed to fetch anime quote. Please try again later.');
  }
});
