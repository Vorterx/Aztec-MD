/*
* @Author: DiegosonTech
* @BotName: Aztec-MD
*/

const { getDare } = require('../../lib/getTruth_Dare.js');

module.exports = {
  name: 'dare',
  category: 'Funn',
  async client(vorterx, m, { args, connect }) {
   
    await connect('🤡');
    const dare = getDare();
    vorterx.sendMessage(m.from, { text:` *Dare*: ${dare}`});
  },
};
