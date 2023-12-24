/*
* @Author: DiegosonTech
* @BotName: Aztec-MD
*/

const { getDare } = require('../../lib/getTruth_Dare.js');
const config = require('../../config.js');

module.exports = {
  name: 'dare',
  category: 'Fun',
  async client(vorterx, m, { args, connect }) {
   
    await connect('🤡');
    const dare = getDare();
    vorterx.sendMessage(m.from, { text:` *Dare*: ${dare}\n\n*${config.CAPTION}*`});
  },
};
