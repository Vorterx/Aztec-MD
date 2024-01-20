const { Zenith, isUrl,shorten } = require('../../lib/functions');

Zenith(
  {
    usage: 'shorten',
    desc: 'Shortens a given long URL using cleanuri.',
    category: 'Mics',
  },
  async (vorterx, m, react, { args }) => {
   
    if (!args) {
      await react('❌');
      return m.reply('*_Please provide a URL to shorten_*');
    }

    if (!isUrl(args)) {
      await react('❌');
      return m.reply('*_Please provide a valid URL_*');
    }

    try {
      await react('⌛');

      let RES_SHOTERN = await shorten(args);

      await react('✅');
      vorterx.sendMessage(m.chat, { text: RES_SHOTERN });
    } catch (error) {
      console.error(error.message);
      await react('❌');
      return m.reply('*_Error occurred while shortening_*');
    }
  }
);
    
