const axios = require('axios');
const { Zenith } = require('../../lib/functions');
const config = require('../../config.js');

Zenith({
  usage: 'anime-quote',
  desc: 'Anime Quotes',
  category: 'Anime',
}, async (vorterx, m, react) => {
  await react('✔️');

  let cmd = "https://i.imgur.com/oGX8YvH.jpg";
  const res = await axios.get('https://api.lolhuman.xyz/api/random/quotesnime?apikey=5c250069e8936d6bf70295b8');

  if (res && res.data && res.data.result) {
    const { quote, character, anime, episode } = res.data.result;
    const forQuote = `*ANIME QUOTE:*\n${quote}\n\n*_Character_:* ${character}\n\n*_Anime_:* ${anime}\n\n*_Episode_:* ${episode}\n\n*${config.CAPTION}*`;

    await vorterx.sendMessage(m.chat, { image: { url: cmd }, text: forQuote });
  } else {
    console.error(res && res.data && res.data.message);
    m.reply('Please try again later.');
  }
});
  
