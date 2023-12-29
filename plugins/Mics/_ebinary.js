/*
* @Author: DiegosonTech
* @BotName: Aztec-MD
*/

const { eBinary } = require('../../lib/_getBinary.js');

Zenith({
  usage: 'ebinary',
  category: 'Mics',
  desc: 'For Funny',
  filename: __filename
}, async (vorterx, coax, args, react) => {
  if (!args) {
    await react('❌');
    return coax.reply('Provide a text to encode in binary...');
  }

  await react('🔄');
  coax.reply(await eBinary(args));
});
       
