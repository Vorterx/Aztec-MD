/*
* @Author: DiegosonTech
* @BotName: Aztec MD 
*/

const TruthOrDare = require('../../lib/getTruth_Dare.js');
const config = require('../../config.js');
const { Zenith } = require ('../../lib/_cmd_sxntax.js');

Zenith (
  {
  usage: 'truth',
  category: 'Fun',
  desc: 'For funny',
  filename: __filename
}, async (vorterx, m, react) => {
   
    await  react('🤡');
    const truth = TruthOrDare.getTruth();
    vorterx.sendMessage(m.chat,{ text: `*Truth*: ${truth}\n\n*${config.CAPTION}*`});
  });
