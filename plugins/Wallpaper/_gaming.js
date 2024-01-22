const { Zenith } = require('../../lib/functions');
const config = require('../../config');

Zenith({
  usage: 'gaming',
  desc: 'wallpaper',
  category: 'Wallpaper',
  
}, async (vorterx, m, react) => {
 
  await react('✔️');
  async function _GAMIMG() {
    await vorterx.sendMessage(m.chat, { image: { url: "https://api.botcahx.eu.org/api/wallpaper/gaming?apikey=sjANGiU8"}, caption: `*${config.CAPTION}*` });
  }

  await _GAMING();
});
                                                
