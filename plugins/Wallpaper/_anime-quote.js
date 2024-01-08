/*
* @Author: DiegosonTech
* @botName: Aztec-MD 
*/

const axios = require('axios');
const { Zenith } = require('../../lib/functions');

Zenith({
  usage: 'anime-quote',
  desc: 'Anime Quotes',
  category: 'Anime',
}, async (vorterx, m, react) => {

  await react('✔️');
  try {
    const res = await axios.get('https://api.lolhuman.xyz/api/random/quotesnime?apikey=GataDios'); 
    if (res && res.data && res.data.status === 200) {
      const { quote, character, anime, episode } = res.data.result;
      const forQuote = `*ANIME QUOTE:*\n${quote}\n\n*_Character_:* ${character}\n\n*_Anime_:* ${anime}\n\n*_Episode_:* ${episode}`;

      await vorterx.sendMessage(m.chat, { image: { url: "https://i.imgur.com/oGX8YvH.jpg" }, caption: forQuote });
    } else {
      console.error(res && res.data && res.data.message);
      m.reply('Please try again later');
    }
  } catch (error) {
    console.error(error.message);
    m.reply('Please try again later');
  }
});
