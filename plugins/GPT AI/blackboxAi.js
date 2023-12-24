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
    try {
      if (!args) {
        await connect('❌');
        return m.reply(
          "```\nError 404: Text not found. Please provide a text to get results...\n```"
        );
      }

      const getBlack = `https://mzn-api.onrender.com/ai/blackbox?prompt=${encodeURIComponent(args)}`;

      const res = await fetch(getBlack);

      if (!res.ok) {
        m.reply(`Request failed with status ${res.status}`);
      }

      const result = await res.json();
      console.log('result);

      const getRes = result.res;
      const getFinal = `*BLACKBOX AI*\n\n${getRes}\n\n*${config.CAPTION}*`;

     await vorterx.sendMessage(m.from, {
        image: { url: 'URL_TO_YOUR_IMAGE' },
        caption: getFinal,
      });

      await connect('🤖');
    } catch (error) {
      console.error('Error in blackbox AI:', error);
      await connect('❌');
      return m.reply("```\nError in blackbox AI. Please try again later.\n```");
    }
  },
};
        
