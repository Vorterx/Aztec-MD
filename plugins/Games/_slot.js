const { Zenith } = require('../lib/functions');

Zenith({
  usage: 'slot',
  desc: 'Play and win',
  category: 'GAMES 3D',
}, async (vorterx, m, react, { args }) => {

  const _PLAY_NAME = m.pushName;
  let _SPIN = 100 / 70000;

  const red = '🔴';
  const green = '🟢';
  const blue =  '🔵';
  const yellow = '🟡';
  const purple = '🟣';
  const orange = '🟠';

  const spine = red;
  const speni = purple;
  const get = green;
  const got = yellow;
  const groot = red;
  const bot = blue;
  const aztec = orange;
  const is = purple;

  const _HEADER = `🎰_S L O T G A M E_🎰\n${spine}➕${speni}\n${get}➕${got}➕${groot}\n${bot}➕${aztec}➕${is}\n\n${_PLAY_NAME}`;

  const _SLOT_EMO = [red, green, blue, yellow, purple, orange];

  const _random = Math.floor(Math.random() * _SLOT_EMO.length);
  const result = _SLOT_EMO[_random];

  let wins, points, winMessage;
  if (result === red) {
    wins = 'V I C T O R Y';
    points = 100; 
    winMessage = 'B I G W I N';
  } else if (result === green) {
    wins = 'J A C K P O T';
    points = 1000; 
    winMessage = 'A W E S O M E W I N';
  } else if (result === blue) {
    wins = 'A W E S O M E W I N';
    points = 2000; 
    winMessage = 'V I C T O R Y';
  } else if (result === purple) {
    wins = 'B I G W I N';
    points = 90000; 
    winMessage = 'J A C K P O T';
  }

  const _GET_BOAD = `${_HEADER}\nWINS: ${wins}\nPOINTS: ${points}\nWIN: ${winMessage}`;
  await vorterx.sendMessage(m.chat, { text: _GET_BOAD, quoted: m });

});
