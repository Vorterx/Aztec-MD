const { Zenith } = require('../../lib/functions.js');

Zenith({
  usage: 'shutdown',
  desc: 'Shutting down the bot on Heroku',
  category: 'Owner',
  filename: __filename
}, async (vorterx, m, react, { isDev }) => {
 
  if (!isDev) {
    await react('❌');
    return m.reply('This command is for my Dev only');
  }

  await react('💤'); 
  await m.reply('_Shutting the bot down_');

  process.exit(1);
});
  
