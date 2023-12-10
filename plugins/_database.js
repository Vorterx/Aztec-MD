const util = require('util');

async function getMac(m) {
  try {
    let id = m.sender;
    let timeout = 180000;
    let reward = randomInt(100, 800);
    let users = global.db.data.users[m.sender];
    let body = typeof m.text === 'string' ? m.text : '';
    vorterx.bomb = vorterx.bomb ? vorterx.bomb : {};

    let isSurrender = /^(givup)$/i.test(body);
    if (isSurrender) {
      await m.reply(`🚩 Menyerah`);
      clearTimeout(vorterx.bomb[id][2]);
      delete vorterx.bomb[id];
    }

    if (id in vorterx.bomb && !isNaN(body)) {
      let json = vorterx.bomb[id][1].find(v => v.position == body);
      if (!json) return m.reply(`🚩 Untuk membuka kotak kirim angka 1 - 9`);
      if (json.emot === '💥') {
        json.state = true;
        let bomb = vorterx.bomb[id][1];
        let teks = `乂  *B O M B*\n\n`;
        teks += bomb.slice(0, 3).map(v => (v.state ? v.emot : v.number)).join('') + '\n';
        teks += bomb.slice(3, 6).map(v => (v.state ? v.emot : v.number)).join('') + '\n';
        teks += bomb.slice(6).map(v => (v.state ? v.emot : v.number)).join('') + '\n\n';
        teks += `Timeout : [ *${((timeout / 1000) / 60)} menit* ]\n`;
        teks += `*Permainan selesai!*, kotak berisi bom terbuka : (- *${formatNumber(reward)}*)`;

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
        return m.reply(`${m.from}, 🚩 Kotak ${json.number} sudah di buka silahkan pilih kotak yang lain.`);
      } else {
        json.state = true;
        let changes = vorterx.bomb[id][1];
        let open = changes.filter(v => v.state && v.emot !== '💥').length;

        if (open >= 8) {
          let teks = `乂  *B O M B*\n\n`;
          teks += `Kirim angka *1* - *9* untuk membuka *9* kotak nomor di bawah ini :\n\n`;
          teks += changes.slice(0, 3).map(v => (v.state ? v.emot : v.number)).join('') + '\n';
          teks += changes.slice(3, 6).map(v => (v.state ? v.emot : v.number)).join('') + '\n';
          teks += changes.slice(6).map(v => (v.state ? v.emot : v.number)).join('') + '\n\n';
          teks += `Timeout : [ *${((timeout / 1000) / 60)} menit* ]\n`;
          teks += `*Permainan selesai!* kotak berisi bom tidak terbuka : (+ *${formatNumber(reward)}*)`;

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
          teks += bomb.slice(0, 3).map(v => (v.state ? v.emot : v.number)).join('') + '\n';
          teks += bomb.slice(3, 6).map(v => (v.state ? v.emot : v.number)).join('') + '\n';
          teks += bomb.slice(6).map(v => (v.state ? v.emot : v.number)).join('') + '\n\n';
          if (open >= 8) {
          let teks = `乂  *B O M B*\n\n`;
  teks += changes.slice(0, 3).map(v => (v.state ? v.emot : v.number)).join('') + '\n';
  teks += changes.slice(3, 6).map(v => (v.state ? v.emot : v.number)).join('') + '\n';
  teks += changes.slice(6).map(v => (v.state ? v.emot : v.number)).join('') + '\n\n';
  if (open >= 8) {
  let teks = `乂  *B O M B*\n\n`;
teks += `Timeout : [ *${((timeout / 1000) / 60)} menit* ]\n`;
teks += `Kotak berisi bom tidak terbuka : (+ *${formatNumber(reward)}*)`;
vorterx.sendMessage(m.from, teks, m).then(() => {
users.exp += reward;
});
}
}
}
} catch (e) {
return vorterx.sendMessage(m.from, util.format(e), m);
}
return !0;
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function formatNumber(number) {
  return number.toLocaleString();
}

module.exports = {
  randomInt,
  formatNumber
}
           };
