const { mode } = require('../lib/message/vorterx.js');

module.exports = {
  name: '(set|mod|use)',
  description: 'To set private mode or public using cmd',
  category: 'Owner',
  async xstart(vorterx, m, { text, args, xReact }) {
   
    if (process.env.MODS !== text) {
      await xReact('❌');
      return m.reply('This command is for my owner only');
    }
    if (args.length < 1) {
      await xReact('❌');
      return vorterx.sendMessage(m.from, { text: 'Please specify the mode (private or public).' });
    }
    const worktype = args[0].toLowerCase();
    if (worktype === 'private') {
      await xReact('✔️');
      mode.set('private');
      m.reply('Bot set to private. Only mods and the bot owner can use the bot now.');
    } else if (worktype === 'public') {
      await xReact('✔️');
      mode.set('public');
      m.reply('Bot set to public. Anyone can use the bot now.');
    } else {
      m.reply('Invalid mode. Please specify either "private" or "public".');
    }
  },
};
