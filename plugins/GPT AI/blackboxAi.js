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
    const getBlack = `https://mzn-api.onrender.com/ai/blackbox?prompt=${encodeURIComponent(args)}`;
    
    const response = await fetch(getBlack);
    const result = await res.json();

    const getRes = result.res || '';
    const getFinal = `*BLACKBOX AI*\n\n${getRes}\n\n*${config.CAPTION}*`;
    await connect('🤖');
    return m.reply(getFinal);
  },
};
      
