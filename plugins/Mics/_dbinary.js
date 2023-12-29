const { getBinary } = require('../../lib/_getBinary');

Zenith(
{
  usage: 'dbinary',
  category: 'Mics',
  desc: 'For funny',
  filename: __filename
}, async(vorterx, coax, args, react) => {
    
  if (!args) {
      await react('❌');
      return coax.reply('_Please provide binary code._');
    }

    await react('✔️');   
    const searchBn = await getBinary(args);
    
    const v_binary = {
      text: `🔢 *Binary Conversion Result* 🔢\n\n${searchBn}`
    };

    vorterx.sendMessage(coax.from, v_binary, { quoted: coax });
  });
