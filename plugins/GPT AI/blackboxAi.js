/*
* @Author: DiegosonTech
* @BotName: Aztec-MD
*/

const fetch = async (url) => import('node-fetch').then(module => module.default(url));
const config = require('../../config.js');

module.exports = {
  name: 'blackbox',
  category: 'GPT AI',
  async client(vorterx, m, { args, connect }) {
    
    if (!args) {
      await connect('❌');
      return m.reply(
        "```\nError 404: Text not found. Please provide a text to get results...\n```"
      );
    }

    const black_gpt = `https://api.caliph.biz.id/api/ai/blackbox?q=${args}&apikey=lykoUzNh`;
    const res = await fetch(black_gpt);

    if (!res.ok) {
      console.error('Sorry:', res.statusText);
      await connect('❌');
      return m.reply(
        "```\nSomething went wrong. The dark forces are at play. Try again later.\n```"
      );
    }

    const { data } = await res.json();

    if (data) {
      const anu = getResults(data);
      await connect('✅');
      return m.reply(`\n*BLACKBOX AI*: ${anu}\n\n*${config.CAPTION}*`);
    } else {
      await connect('❌');
      return m.reply("```\nError: Unable to retrieve data from the API.\n```");
    }
  },
};

function getResults(data) {
  return data;
}
