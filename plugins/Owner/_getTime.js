const { tiny } = require("@viper-x/fancytext");
const config = require('../../config.js');

module.exports = {
  name: "runtime",
  category: "Owner",
  async client(vorterx, m, { isDev, text, args, connect }) {
    try {
      if (!isDev) {
        await connect('❌');
        return m.reply('This command is for my Dev only');
      }

      await connect('🕦');
      
      const currentHour = new Date().getHours();
      let greeting;

      if (currentHour < 12) {
        greeting = 'Morning';
      } else if (currentHour < 18) {
        greeting = 'Afternoon';
      } else {
        greeting = 'Night';
      }

      const runtimeInMilliseconds = Date.now() - m.timestamp;
      const seconds = Math.floor(runtimeInMilliseconds / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);

      const runtime = `${hours} hours, ${minutes % 60} minutes, ${seconds % 60} seconds`;

      const cap = `
╭–– 『 *GET TIME* 』
┆ *🌅DayType:* ${greeting}!
┆ *⏳Runtime:* ${runtime}
┆ *⏱️Time:* ${new Date().toLocaleTimeString()}
╰–––––––––––––––༓\n\n*${config.CAPTION}*`;
      
      await vorterx.sendMessage(m.from, { caption: tiny(cap) });
    } catch (error) {
      console.error(error);
      m.reply('An error occurred while processing the command.');
    }
  }
};
