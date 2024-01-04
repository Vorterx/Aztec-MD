const { getBinary } = require('../../lib/_getBinary');
const { Zenith } = require ('../../lib/_cmd_sxntax.js');

Zenith(
{
  usage: 'dbinary',
  category: 'Mics',
  desc: 'For funny',
  filename: __filename
}, async (vorterx, m, react, {args}) => {
    
  if (!args) {
      await react('❌');
      return m.reply('_Please provide binary code._');
    }

    await react('✔️');   
    const searchBn = await getBinary(args);
    
    const v_binary = {
      text: `🔢 *Binary Conversion Result* 🔢\n\n${searchBn}`
    };

    vorterx.sendMessage(m.chat, v_binary, { quoted: m });
  });
