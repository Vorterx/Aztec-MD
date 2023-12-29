const config = require('../../config.js');

Zenith ( 
  {
  usage: 'attp',
  category: 'Convert',
  desc: 'attps',
  filename: __filename
  }, async (vorterx, coax, args, react) => {

    if (!args) {
      await react('❌');
      return coax.reply('Please provide a text e.g attp Vorterx...');
    }

    await react('✔️');
    vorterx.sendMessage(coax.from, {
      sticker: {
        url: `https://api.lolhuman.xyz/api/attp?apikey=GataDios&text=${args}`,
        pack: config.CAPTION
      }
    }, { quoted: coax });

  });
      
