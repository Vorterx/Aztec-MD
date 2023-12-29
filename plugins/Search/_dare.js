/*
* @Author: DiegosonTech
* @BotName: Aztec-MD
*/

const { getDare } = require('../../lib/getTruth_Dare.js');
const config = require('../../config.js');
const { Zenith } = require ('../../lib/_cmd_sxntax.js');

Zenith(
  {
  usage: 'dare',
  category: 'Fun',
  desc: 'For funny',
  filename: __filename
  }, async (vorterx, coax, args, react) => {
   
    await react('🤡');
    const dare = getDare();
    vorterx.sendMessage(coax.from, { text:` *Dare*: ${dare}\n\n*${config.CAPTION}*`});
  });
