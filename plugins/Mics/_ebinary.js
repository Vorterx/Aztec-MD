/*
* @Author: DiegosonTech
* @BotName: Aztec-MD
*/

const { eBinary } = require('../../lib/_getBinary.js');

module.exports = {
  name: 'ebinary',
  category: 'Mics',
  async client(vorterx, m, { args, connect }) {
    if (!args) {
      await connect('❌');
      return m.reply('Provide a text to encode in binary...');
    }

    await connect('🔄');
    m.reply(await eBinary(args));
  }
};
