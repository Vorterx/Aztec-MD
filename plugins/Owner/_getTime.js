const config = require('../../config.js');

Zenith(
  {
  usage: 'runtime',
  category: 'Owner',
  desc: 'Fir the owner time',
  filename: _filename
  }, async (vorterx, coax, isDev, args, react) => {
    try {
      if (!isDev) {
        await react('❌');
        return coax.reply('This command is for my Dev only');
      }

      await react('🕦');

      const currentHour = new Date().getHours();
      const greeting =
        currentHour < 12 ? 'Morning' : currentHour < 18 ? 'Afternoon' : 'Night';

      const runtimeInMilliseconds = Date.now() - m.timestamp;
      const seconds = Math.floor(runtimeInMilliseconds / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);

      const runtime = `${hours} hours, ${minutes % 60} minutes, ${seconds % 60} seconds`;

      const formattedTime = new Date().toLocaleTimeString();

      const cap = `
╭–– 『 *GET TIME* 』
┆ *🌅DayType:* ${greeting}!
┆ *⏳Runtime:* ${runtime}
┆ *⏱️Time:* ${formattedTime}
╰–––––––––––––––༓\n\n*${config.CAPTION}*`;

      await vorterx.sendMessage(coax.from, { caption: cap });
    } catch (error) {
      console.error(error);
      await connect('❌');
      return coax.reply('An error occurred while processing the command.');
    }
  });
        
