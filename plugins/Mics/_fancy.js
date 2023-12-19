const { vorterxFancy, fancyTextStyles } = require('../../lib/styles.js');

module.exports = {
  name: 'fancy',
  category: 'Mics',
  async client(vorterx, m, { text, args, connect }) {

    await connect('4️⃣');
    if (args.length === 0) {
      const allFancy = fancyTextStyles.map((style, index) => `${vorterxFancy(index + 1)} ${text}`).join('\n');
      const start = `
      | {allFancy}
      └─────◉

      m.reply(`${start}\n${allFancy}`);
    } else {
      const styleNum = parseInt(args[0]);

      if (!isNaN(styleNum) && styleNum >= 1 && styleNum <= fancyTextStyles.length) {
        const  getText = `*_ꜰᴀɴᴄʏ ᴛᴇxᴛ ɢᴇɴᴇʀᴀᴛᴏʀ_*
★━━━━━━━━━━━━━━━━━━━━━★
*Preview of Style ${styleNum}:*
${vorterxFancy(styleNum)} ${text}
★━━━━━━━━━━━━━━━━━━━━━★`;

        m.reply(getText);
      } else {
        m.reply('Invalid input. Please provide a valid style number.');
      }
    }
  },
}; 
