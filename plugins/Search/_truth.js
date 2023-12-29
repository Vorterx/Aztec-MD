/*
* @Author: DiegosonTech
* @BotName: Aztec MD 
*/

const { getTruth } = require('../../lib/getTruth_Dare.js');
const config = require('../../config.js');
const { Zenith } = require ('../../lib/_cmd_sxntax.js');

Zenith (
  {
  usage: 'truth',
  category: 'Fun',
  desc: 'For funny',
  filename: __filename
}, async (vorterx, coax, react) => {
   
    await  react('🤡');
    const truth = getTruth();
    vorterx.sendMessage(coax.from,{ text: `*Truth*: ${truth}\n\n*${config.CAPTION}*`});
  });
