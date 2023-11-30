module.exports = {
  name: '(mods|sudos)',
  description: 'To check mods admins to the bot',
  category: 'Owner',
  async xstart(vorterx, m, { text, args, quoted, xReact }) {
  
    await xReact('✔️');
    let azteci = '*👤 VORTERX MODS 👤*\n\n';
    const mods = process.env.MODS || '';

    if (mods) {
      const sudo = mods.split(',');
      for (let i = 0; i < sudo.length; i++) {
        azteci += `*#${i + 1} 〄* ${sudo[i]}\n`;
      }
    } else {
      azteci += '`No mods are set for now`';
    }
    const img = 'https://i.ibb.co/2dvDgBd/464318-5149318-823730-thumbnail.png';
    await vorterx.sendMessage(m.from, { image: { url: img, caption: azteci } }, { quoted: m });
  }
};
