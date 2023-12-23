const axios = require('axios');
const google = require('google-it');
const chalk = require('chalk');

module.exports = {
  name: 'google',
  category: 'Search',
  async client(vorterx, m, { args, text, connect }) {

    if(!args) {
      await connect('❌');
      return m.reply(`\`\`\`Please provide a query\`\`\``);
    }     
    await connect("🔍");
        google({ query: args }).then(res => {
          let aztec = `🔎 *GOOGLE SEARCH RESULTS* 🔍\n\n${args}\n\n`;

          for (let g of res) {
            aztec += `📚 *TITLE*: ${g.title}\n`;
            aztec += `📝 *DESCRIPTION*: ${g.snippet}\n`;
            aztec += `🌐 *LINK*: ${g.link}\n\n───────────────────────\n\n`;
          }

          const formattedAztec = chalk.bold(aztec);

          const img = "https://i.ibb.co/B3KNxyk/6351f5da506d8f7635f2be3feb6950c6.jpg";
          vorterx.sendMessage(m.from, { image: { url: img }, caption: formattedAztec }, { quoted: m });
        }).catch(err => {
          console.error(err);
        });
      }
          }
          
