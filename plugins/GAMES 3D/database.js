const util = require('util');

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function formatNumber(number) {
  return number.toLocaleString();
}

async function getBox(vorterx, m) {
  try {
    let id = m.sender;
    let timeout = 180000;
    let reward = randomInt(100, 800);
    let users = {};

    let body = typeof m.text === 'string' ? m.text : '';
    vorterx.bomb = vorterx.bomb ? vorterx.bomb : {};

    let isSurrender = /^(givup)$/i.test(body);
    if (isSurrender) {
      await m.reply(`😢Surrendered.`);
      clearTimeout(vorterx.bomb[id][2]);
      delete vorterx.bomb[id];
    }

    if (id in vorterx.bomb && !isNaN(body)) {
      let json = vorterx.bomb[id][1].find(v => v.position == body);
      if (!json) return m.reply(`To open a box, send a number from 1 to 9.`);
      if (json.emot === '💥') {
        json.state = true;
        let bomb = vorterx.bomb[id][1];
        let teks = `乂  *B O M B*\n\n`;
        teks += bomb.slice(0, 3).map(v => (v.state ? v.emot : v.number)).join('') + '\n';
        teks += bomb.slice(3, 6).map(v => (v.state ? v.emot : v.number)).join('') + '\n';
        teks += bomb.slice(6).map(v => (v.state ? v.emot : v.number)).join('') + '\n\n';
        teks += `Timeout : [ *${((timeout / 1000) / 60)} minute* ]\n`;
        teks += `*Game over!* The box containing the bomb did not open. : (- *${formatNumber(reward)}*)`;

        vorterx.sendMessage(m.from, teks, m).then(() => {
          if (users.exp < reward) {
            users.exp = 0;
          } else {
            users.exp -= reward;
          }
          clearTimeout(vorterx.bomb[id][2]);
          delete vorterx.bomb[id];
        });
      } else if (json.state) {
        return m.reply(`${m.from},  Box ${json.number} has been opened. Please choose another box.`);
      } else {
        json.state = true;
        let changes = vorterx.bomb[id][1];
        let open = changes.filter(v => v.state && v.emot !== '💥').length;

        if (open >= 8) {
          let teks = `乂  *B O M B*\n\n`;
          teks += `Send the number *1* - *9* to open the corresponding *9* boxes below. :\n\n`;
          teks += changes.slice(0, 3).map(v => (v.state ? v.emot : v.number)).join('') + '\n';
          teks += changes.slice(3, 6).map(v => (v.state ? v.emot : v.number)).join('') + '\n';
          teks += changes.slice(6).map(v => (v.state ? v.emot : v.number)).join('') + '\n\n';
          teks += `Timeout : [ *${((timeout / 1000) / 60)} minute* ]\n`;
          teks += `*Game over!* The box containing the bomb did not open.: (+ *${formatNumber(reward)}*)`;

          vorterx.sendMessage(m.from, teks, m).then(() => {
            if (users.exp < reward) {
              users.exp = 0;
            } else {
              users.exp -= reward;
            }
            clearTimeout(vorterx.bomb[id][2]);
            delete vorterx.bomb[id];
          });
        } else {
          let teks = `乂  *B O M B*\n\n`;
          teks += changes.slice(0, 3).map(v => (v.state ? v.emot : v.number)).join('') + '\n';
          teks += changes.slice(3, 6).map(v => (v.state ? v.emot : v.number)).join('') + '\n';
          teks += changes.slice(6).map(v => (v.state ? v.emot : v.number)).join('') + '\n\n';
          if (open >= 8) {
            teks += `Timeout : [ *${((timeout / 1000) / 60)} minute* ]\n`;
            teks += `The box containing the bomb is not opened.: (+ *${formatNumber(reward)}*)`;
            vorterx.sendMessage(m.from, teks, m).then(() => {
              users.exp += reward;
            });
          }
        }
      }
    }
  } catch (e) {
    return vorterx.sendMessage(m.from, util.format(e), m);
  }
  return !0;
}

module.exports = {
  randomInt,
  formatNumber,
  getBox
}; 
