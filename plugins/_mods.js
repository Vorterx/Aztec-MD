module.exports = {
  name: 'mods',
  alias: ['sudo'],
  description: 'To check mods admins to the bot',
  category: 'Owner',
  async client(vorterx, m, { text, args, quoted, connect }) {
    await connect('✔️');
    let azteci = '*👤 VORTERX MODS 👤*\n\n';
    const mods = process.env.MODS || '';
    let sudo = [];

    if (mods) {
      sudo = mods.split(',');
      for (let i = 0; i < sudo.length; i++) {
        azteci += `*#${i + 1} 〄* @${sudo[i]}\n`;
      }
    } else {
      azteci += '`No mods are set for now`';
    }
    const img = 'https://i.ibb.co/2dvDgBd/464318-5149318-823730-thumbnail.png';
    
    const mentions = sudo.map((x) => ({
      tag: x + '@s.whatsapp.net',
      id: x.split('@')[0]
    }));
    
    await vorterx.sendMessage(
      m.from,
      {
        image: {
          url: img,
          caption: azteci,
          mentions: mentions
        }
      },
      {
        quoted: m
      }
    );
  }
};
