/*
* @Author: DiegosonTech
* @BotName: Aztec-MD
*/

const TruthOrDare = require('../../lib/getTruth_Dare.js');
const config = require('../../config.js');
const { Zenith } = require('../../lib/_cmd_sxntax.js');

Zenith(
  {
  usage: 'dare',
  category: 'Fun',
  desc: 'For funny',
  filename: __filename
  }, async (vorterx, m, react) => {
   
    await react('🤡');
    const dare = TruthOrDare.getDare();
    vorterx.sendMessage(m.chat, { text:` *Dare*: ${dare}\n\n*${config.CAPTION}*`});
  });
