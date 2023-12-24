const { vorterxFancy, fancyTextStyles } = require('../../lib/styles.js');
const config = require('../../config.js');

module.exports = {
  name: 'fancy',
  category: 'Mics',
  async client(vorterx, m, { args, connect }) {
    await connect('4️⃣');
    
    if (!Array.isArray(fancyTextStyles)) {
      m.reply('Error: fancyTextStyles is not an array.');
      return;
    }

    if (args.length === 0) {
      const allFancy = fancyTextStyles.map((style, index) => `${vorterxFancy(index + 1)} ${args[index]}`).join('\n');
      const start = `
┌──『 *Fancy* 』
| fancy 2[]
└─────────◉
┌──◉
|${allFancy}
└─────◉\n\n*${config.CAPTION}*`;

      m.reply(`${start}\n`);
    } else {
      const styleNum = parseInt(args[0]);

      if (!isNaN(styleNum) && styleNum >= 1 && styleNum <= fancyTextStyles.length) {
        const getText = `
┌──◉
|*Styled ${styleNum}*:
|${vorterxFancy(styleNum)} ${args.slice(1).join(' ')}
└─────◉\n\n*${config.CAPTION}*
`;
        m.reply(getText);
      } else {
        m.reply('Invalid input. Please provide a valid style number...');
      }
    }
  },
};
