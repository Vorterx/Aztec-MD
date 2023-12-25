const { getBinary } = require('../../lib/_getBinary');

module.exports = {
  name: 'dbinary',
  category: 'Mics',
  async client(vorterx, m, { args, connect }) {
    if (!args) {
      await connect('❌');
      return m.reply('_Please provide binary code._');
    }

    await connect('✔️');   
    const searchBn = await getBinary(args);
    
    const v_binary = {
      text: `🔢 *Binary Conversion Result* 🔢\n\n${searchBn}`
    };

    vorterx.sendMessage(m.from, v_binary, { quoted: m });
  }
};
