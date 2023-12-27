module.exports = {
  name: 'bomb',
  alias: ['game'],
  category: 'GAMES 3D',
  async client(vorterx, m, {  args, connect }) {
    vorterx.bomb = vorterx.bomb || {};
    const id = m.sender;
    const timeout = 180000;

    if (id in vorterx.bomb) {
      return vorterx.sendMessage(m.from, { text: '*This session is not yet finished!*' }, vorterx.bomb[id][0]);
    }

    const bom = ['💥', '✅', '✅', '✅', '✅', '✅', '✅', '✅', '✅'].sort(() => Math.random() - 0.5);
    const number = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣'];
    const array = bom.map((v, i) => ({
      emot: v,
      number: number[i],
      position: i + 1,
      state: false
    }));

    let teks = `乂  *B O M B*\n\nSend numbers *1* - *9* to open *9* number boxes below:\n\n`;

    for (let i = 0; i < array.length; i += 3) {
      teks += array.slice(i, i + 3).map(v => (v.state ? v.emot : v.number)).join('') + '\n';
    }

    teks += `\nTimeout: [ *${(timeout / 1000) / 60} minutes* ]\nIf you encounter a box with a bomb, your points will be deducted. Type "givup" to give up.`;

    let msg = await vorterx.sendMessage(m.from, {
      text: teks,
      contextInfo: {
        externalAdReply: {
          title: '',
          body: 'Bomb',
          thumbnailUrl: 'https://telegra.ph/file/b3138928493e78b55526f.jpg',
          sourceUrl: '',
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: m });

    const { key } = msg;
    let v;

    vorterx.bomb[id] = [
      msg,
      array,
      setTimeout(() => {
        v = array.find(v => v.emot === '💥');
        if (vorterx.bomb[id]) {
          vorterx.sendMessage(m.from, { text: `*Time's up!*, Bomb is in box number ${v.number}.` }, vorterx.bomb[id][0].key);
        }
        delete vorterx.bomb[id];
      }, timeout),
      key
    ];
  }
};
    
