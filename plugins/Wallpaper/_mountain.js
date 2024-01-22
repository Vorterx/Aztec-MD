const { Zenith } = require('../../lib/functions');
const config = require('../../config');

Zenith({
  usage: 'mountain',
  desc: 'wallpaper',
  category: 'Wallpaper',
  
}, async (vorterx, m, react) => {
 
  await react('✔️');
  async function _PAPER() {
    await vorterx.sendMessage(m.chat, { image: { url: "https://api.botcahx.eu.org/api/wallpaper/mountain?apikey=sjANGiU8"}, caption: `*${config.CAPTION}*` });
  }

  await _PAPER();
});
                                                
