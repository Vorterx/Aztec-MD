const { Zenith } = require('../../lib/functions');
const config = require('../../config');

Zenith({
  usage: 'bts',
  desc: 'Bts wallpaper',
  category: 'Wallpaper',
  filename: __filename
}, async (vorterx, m, react) => {
  await react('✔️');

  async function bts_isGay() {
    await vorterx.sendMessage(m.chat, { image: { url: "https://api.lolhuman.xyz/api/random/bts?apikey=GataDios" }, caption: `*${config.CAPTION}*` });
  }

  await bts_isGay();
});
                                                
