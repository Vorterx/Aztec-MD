const axios = require('axios');
const google = require('google-it');
const chalk = require('chalk');
const { Zenith } = require ('../../lib/_cmd_sxntax.js');


Zenith(
  {
  usage: 'google',
  category: 'Search',
  desc: 'To search any',
  filename: __filename
  }, async (vorterx, m, react, {args}) => {

    if(!args) {
      await react('❌');
      return m.reply(`\`\`\`Please provide a query\`\`\``);
    }     
    await react("🔍");
        google({ query: args }).then(res => {
          let aztec = `🔎 *GOOGLE SEARCH RESULTS* 🔍\n\n${args}\n\n`;

          for (let g of res) {
            aztec += `📚 *TITLE*: ${g.title}\n`;
            aztec += `📝 *DESCRIPTION*: ${g.snippet}\n`;
            aztec += `🌐 *LINK*: ${g.link}\n\n───────────────────────\n\n`;
          }

          const formattedAztec = chalk.bold(aztec);

          const img = "https://i.ibb.co/B3KNxyk/6351f5da506d8f7635f2be3feb6950c6.jpg";
          vorterx.sendMessage(m.chat, { image: { url: img }, caption: formattedAztec }, { quoted: chat });
        }).catch(err => {
          console.error(err);
        });
      })
          
