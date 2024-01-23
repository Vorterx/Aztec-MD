const { Zenith } = require('../../lib/functions');
const config = require('../../config');

Zenith({
  usage: 'pinterest',
  desc: 'Download from Pinterest',
  alias: ['pint'],
  category: 'Downloads',
}, async (vorterx, m, react, { args }) => {
 
  if (!(args?.includes("https://pin.it"))) {
    console.error("Provide a valid pin url");
    await react('❌');
    return m.reply('*_Pllease provide a valid Pinterest url_*');
  }

  await react("🍁");
  const { data: RES_DATA } = await axios.post(
    'https://offeo.com/download/wp-json/aio-dl/video-data/',
    { url: args },
    {
      headers: {
        'Accept': '*/*',
        'Accept-Encoding': 'gzip, deflate, br',
      },
    }
  );

    let PINTERS = `*Title:* ${RES_DATA.title}\n\n*${config.CAPTION}*`;
    RES_DATA.medias.forEach(media => {
    PINTERS += `*Quality:* ${media.quality}\n- *Size:* ${media.size}\n\n*${config.CAPTION}*`;
  });

  const VERGAS = RES_DATA.medias[0].url;
  await vorterx.sendMessage(m.chat, { video: { url: VERGAS }, caption: RES_DATA }, { quoted: m });
});
