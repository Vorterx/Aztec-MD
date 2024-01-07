/*
* @Author: DiegosonTech
* @BotName: Aztec-MD
*/

const fetch = async (url) => (await import('node-fetch')).default(url);
const config = require('../../config.js');
const { Zenith } = require('../../lib/_cmd_sxntax.js');


Zenith(
  {
  usage: 'blackbox',
  alias: ['black'],
  category: 'GPT AI',
  desc: 'Black box',
  filename: __filename
  }, async (vorterx,m, react, {args}) => {
    
    try {
      if (!args) {
        await react('❌');
        return m.reply(
          "```\nError 404: Text not found. Please provide text to get results...\n```"
        );
      }

      const getBlack = `https://mzn-api.onrender.com/ai/blackbox?prompt=${encodeURIComponent(args)}`;

      const res = await fetch(getBlack);

      if (!res.ok) {
        m.reply(`Error: ${res.status}`);
        return;
      }

      const result = await res.json();
      console.log(result);

    if (!result || !result.response) {
        await react('❌');
        return m.reply(
          "```\nError 404: Search not found.for the provided text...\n```"
        );
      }

      const getRes = result.response;
      const getFinal = `*BLACKBOX AI*\n\n${getRes}\n\n*${config.CAPTION}*`;

      await vorterx.sendMessage(m.chat, {
        image: { url: 'https://i.ibb.co/DLyfLjq/BLACKBOX-AI-BY-DIEGOSON-TECH.png' },
        caption: getFinal,
      });

      await react('🤖');
    } catch (error) {
      console.error(error);
      await react('❌');
      return m.reply("```\nAn error occurred. Please try again...\n```");
    }
  });
          
