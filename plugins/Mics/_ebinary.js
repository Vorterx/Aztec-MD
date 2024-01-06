/*
* @Author: DiegosonTech
* @BotName: Aztec-MD
*/

const { eBinary } = require('../../lib/_getBinary.js');
const { Zenith } = require('../../lib/_cmd_sxntax.js');

Zenith({
  usage: 'ebinary',
  category: 'Mics',
  desc: 'For Funny',
  filename: __filename
}, async (vorterx, m, react,{args}) => {
  
if (!args) {
    await react('❌');
    return m.reply('Provide a text to encode in binary...');
  }

  await react('🔄');
  m.reply(await eBinary(args));
});
       
