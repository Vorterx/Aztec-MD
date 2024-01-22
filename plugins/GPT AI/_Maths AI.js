const { Zenith } = require('../../lib/functions');
const fetch = async (url) => import('node-fetch').then(module => module.default(url));

Zenith(
  {
    usage: 'maths-ai',
    desc: 'To calculate mathematics',
    category: 'GPT AI',
  }, async (vorterx, m, react, { args }) => {

    if (!args) {
      await react('❌');
      return m.reply('Please provide a maths question');
    }

    var THIS_MATHS = `https://vihangayt.me/tools/mathssolve?q=${args}`;
    try {
      await react ('📖');
      const anu = await fetch(THIS_MATHS);
      const data = await anu.json();

      if (data.status) {
        return m.reply(`*MATHEMATICS AI*\n\n${data.data}`);
      } else {
        return m.reply('*_Unable to process the maths question_*');
      }

    } catch (error) {
      console.error(error);
       m.reply('An error occurred while processing the request');
    }
  });
