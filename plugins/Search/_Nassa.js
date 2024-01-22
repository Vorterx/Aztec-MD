const { Zenith } = require('../lib/functions');
const fetch = async (url) => import('node-fetch').then(module => module.default(url));

Zenith(
  {
    usage: 'nassa',
    desc: 'To check Nassa news',
    category: 'UPDATES',
  }, async (vorterx, m, react, { args }) => {

  await react('✳️');
  const db = 'https://vihangayt.me/details/nasa';
  const THEN_RES = await fetch(db);

  if (THEN_RES.ok) {
    const { status, data } = await THEN_RES.json();

    if (status && data) {
      const { date, explanation, image, title } = data;
      const DETA = `*NASSA NEWS UPDATES*\n*Date*: ${date}\n*Title*: ${title}\n*News*: ${explanation}\n\n*${config.CAPTION}*`;

      vorterx.sendMessage(m.chat, { image: { url: image }, caption: DETA }, { quoted: m });
    } else {
      m.reply('*_E3RR NOT FOUND_*');
    }
  } else {
    const VARTERX = `${THEN_RES.status}`;
    console.error(VARTERX);
    m.reply(VARTERX);
  }
});
