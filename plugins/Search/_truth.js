/*
* @Author: DiegosonTech
* @BotName: Aztec MD 
*/

const { getTruth } = require('../../lib/getTruth_Dare.js');
const config = require('../../config.js');

module.exports = {
  name: 'truth',
  category: 'Fun',
  async client(vorterx, m, { args, connect }) {
   
    await connect('🤡');
    const truth = getTruth();
    vorterx.sendMessage(m.from,{ text: `*Truth*: ${truth}\n\n*${config.CAPTION}*`});
  },
};
