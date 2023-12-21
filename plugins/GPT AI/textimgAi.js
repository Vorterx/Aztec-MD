/*
* @Author: DiegosonTech
* @BotName: Aztec-MD
*/

const fetch = async (url) => import('node-fetch').then(module => module.default(url));
const config = require('../../config.js');

module.exports = {
  name: 'textimg',
  category: 'GPT AI',
  description: 'Text to image AI',
  async client(vorterx, m, { text, args, connect, quoted, mime }) {
   
    if (!text) {
      await connect('❌');
      return m.reply('Please provide me a text e.g textimg Goku');
    }
    const img_ai = `https://api.caliph.biz.id/api/ai/texttoimage?q=${encodeURIComponent(text)}&apikey=lykoUzNh`;
    const res = await fetch(img_ai);

    if (!res.ok) {
      console.error(`${res.status}`);
      m.reply('An error occurred sorry...');
    }
    await connect('✔️');
    const data = await res.json();
    const imagi = Buffer.from(data, 'base64');
    vorterx.sendMessage(m.from,
      { url: `${mime};base64,${imagi.toString('base64')}` },
      'image/png',
      `*${comfig.CAPTION}*`
    );
  },
};
