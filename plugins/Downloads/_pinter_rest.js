const { Zenith } = require('../../lib/functions');
const config = require('../../config');

Zenith({
  usage: 'pinterest',
  desc: 'Download from Pinterest',
  alias: ['pint'],
  category: 'Downloads',
}, async (vorterx, m, react, { args }) => {
 
  if (!(args?.includes("https://pin.it"))) {
    await react('❌');
    return m.reply('*_Pllease provide a valid Pinterest url_*');
  }

  await react("🏜️");
  const { data: RES_DATA } = await axios.post(
    'https://offeo.com/download/wp-json/aio-dl/video-data/',
    { url: args },
    {
      headers: {
        'Accept': '*/*',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'en-US,en;q=0.9','Content-Type': 'application/x-www-form-urlencoded','Cookie': 'pll_language=en; PHPSESSID=qkuimqrohvq5ot3lmns9ehkgb3; _gcl_au=1.1.138273876.1696043402; _gid=GA1.2.348561435.1696043402; _ga_FDKNCWSDS7=GS1.1.1696043402.1.0.1696043402.60.0.0; _ga=GA1.1.1330187036.1696043402; _fbp=fb.1.1696043402567.1760624777; __gads=ID=bd0768991d361a18-2253ecf838e400d1:T=1696043404:RT=1696043404:S=ALNI_MY0aQ6KHEx_fZhzqMDNxoscp1wixQ; __gpi=UID=00000c556652e7de:T=1696043404:RT=1696043404:S=ALNI_MYsdB6hgzlXF_RzwotQ2Xcv8lbIHg; _uetsid=d9a2b7605f3e11eeac11c348dc83100d; _uetvid=d9a2cf705f3e11eeb9fc93376a587e55; _clsk=162nqoi|1696043404819|1|1|w.clarity.ms/collect','Origin': 'https://offeo.com','Referer': 'https://offeo.com/download/pinterest-video-downloader/','Sec-Ch-Ua': '"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"','Sec-Ch-Ua-Mobile': '?0','Sec-Ch-Ua-Platform': '"Windows"','Sec-Fetch-Dest': 'empty','Sec-Fetch-Mode': 'cors','Sec-Fetch-Site': 'same-origin',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36',

      },
    }
  );
    console.log(data);
    let PINTERS = `*Title:* ${RES_DATA.title}\n\n*${config.CAPTION}*`;
    RES_DATA.medias.forEach(media => {
    PINTERS += `*Quality:* ${media.quality}\n- *Size:* ${media.size}\n\n*${config.CAPTION}*`;
  });

  const VERGAS = RES_DATA.medias[0].url;
  await vorterx.sendMessage(m.chat, { video: { url: VERGAS }, caption: RES_DATA }, { quoted: m });
});
