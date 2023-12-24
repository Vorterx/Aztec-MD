const config = require('../../config.js');
const gFx = Array.from({ length: 13 }, (_, i) => `gfx${i + 1}`);
let lolkeysapi = '5c250069e8936d6bf70295b8';

module.exports = {
  name: 'graphics',
  alias: [...gFx],
  description: 'Create logos using gfx',
  async client(vorterx, m, { getCMD, args, connect }) {

    switch (getCMD) {
      case 'gfx1':
        if (!args) {
          await connect('❌');
          return m.reply('Please provide a text e.g gfx1 DiegosonTech');
        }
        await connect('🛡️');
        const caliphkey = 'lykoUzNh';
        let image1 = `https://api.caliph.biz.id/api/kaneki?nama=${encodeURIComponent(args)}&apikey=caliphkey`;
        vorterx.sendMessage(m.from, { image: { url: image1 }, caption: `\n\n*${config.CAPTION}*`}, { quoted: m });
        break;

      case 'gfx2':
        if (!args || !args[0]) {
          await connect('❌');
          return m.reply('Please provide two texts separated by "|" e.g gfx2 DiegosonTech|Aztec');
        }
        await connect('🛡️');
        let [text1, text2] = args[0].split('|');
        let image2 = `https://api.caliph.biz.id/api/girlneko?nama1=${encodeURIComponent(text1)}&nama2=${encodeURIComponent(text2)}&apikey=caliphkey`;
        vorterx.sendMessage(m.from, { image: { url: image2 }, caption: `\n\n*${config.CAPTION}*`}, { quoted: m });
        break;

      case 'gfx3':
        if (!args) {
          await connect('❌');
          return m.reply('Please provide a text e.g gfx3 YourTextHere');
        }
        await connect('🛡️');
        let image3 = `https://api.caliph.biz.id/api/textpro/matrix?text=${encodeURIComponent(args)}&apikey=caliphkey`;
        vorterx.sendMessage(m.from, { image: { url: image3 }, caption: `\n\n*${config.CAPTION}*`}, { quoted: m });
        break;

      case 'gfx4':
        if (!args) {
          await connect('❌');
          return m.reply('Please provide a text e.g gfx4 YourTextHere');
        }
        await connect('🛡️');
        let image4 = `https://api.lolhuman.xyz/api/textprome/jokerlogo?apikey=${lolkeysapi}&text=${encodeURIComponent(args)}`;
        vorterx.sendMessage(m.from, { image: { url: image4 }, caption: `\n\n*${config.CAPTION}*`}, { quoted: m });
        break;

      case 'gfx5':
        if (!args) {
          await connect('❌');
          return m.reply('Please provide a text e.g gfx5 YourTextHere');
        }
        await connect('🛡️');
        let image5 = `https://api.caliph.biz.id/api/textpro/matrix?text=${encodeURIComponent(args)}&apikey=caliphkey`;
        vorterx.sendMessage(m.from, { image: { url: image5 }, caption: `\n\n*${config.CAPTION}*`}, { quoted: m });
        break;

      case 'gfx6':
        if (!args || !args[0]) {
          await connect('❌');
          return m.reply('Please provide two texts separated by "|" e.g gfx6 Text1|Text2');
        }
        await connect('🛡️');
        let [text1_gfx6, text2_gfx6] = args[0].split('|');
        let image6 = `https://api.lolhuman.xyz/api/textprome2/lionlogo?apikey=${lolkeysapi}&text1=${encodeURIComponent(text1_gfx6)}&text2=${encodeURIComponent(text2_gfx6)}`;
        vorterx.sendMessage(m.from, { image: { url: image6 }, caption: `\n\n*${config.CAPTION}*`}, { quoted: m });
        break;

      case 'gfx7':
        if (!args || !args[0] || !args[1]) {
          await connect('❌');
          return m.reply('Please provide two texts separated by "|" e.g gfx7 Text1|Text2');
        }
        await connect('🛡️');
        let text1_gfx7 = args[0] ? args[0].trim() : '';
        let text2_gfx7 = args[1] ? args[1].trim() : '';
        let image7 = `https://api.lolhuman.xyz/api/photooxy2/battlefield4?apikey=${lolkeysapi}&text1=${encodeURIComponent(text1_gfx7)}&text2=${encodeURIComponent(text2_gfx7)}`;
        vorterx.sendMessage(m.from, { image: { url: image7 }, caption: `\n\n*${config.CAPTION}*`}, { quoted: m });
        break;

      case 'gfx8':
        if (!args || !args[0] || !args[1]) {
          await connect('❌');
          return m.reply('Please provide two texts separated by "|" e.g gfx8 Text1|Text2');
        }
        await connect('🛡️');
        let text1_gfx8 = args[0] ? args[0].trim() : '';
        let text2_gfx8 = args[1] ? args[1].trim() : '';
        let image8 = `https://api.lolhuman.xyz/api/photooxy2/battlefield4?apikey=${lolkeysapi}&text1=${encodeURIComponent(text1_gfx8)}&text2=${encodeURIComponent(text2_gfx8)}`;
        vorterx.sendMessage(m.from, { image: { url: image8 }, caption: `\n\n*${config.CAPTION}*`}, { quoted: m });
        break;

      case 'gfx9':
        if (!args) {
          await connect('❌');
          return m.reply('Please provide a text e.g gfx9 YourTextHere');
        }
        await connect('🛡️');
        let image9 = `https://api.lolhuman.xyz/api/ephoto1/anonymhacker?apikey=${lolkeysapi}&text=${encodeURIComponent(args)}`;
        vorterx.sendMessage(m.from, { image: { url: image9 }, caption: `\n\n*${config.CAPTION}*`}, { quoted: m });
        break;

      case 'gfx10':
        if (!args) {
          await connect('❌');
          return m.reply('Please provide a text e.g gfx10 YourTextHere');
        }
        await connect('🛡️');
        let image10 = `https://api.lolhuman.xyz/api/ephoto1/avatarlolnew?apikey=${lolkeysapi}&text=${encodeURIComponent(args)}`;
        vorterx.sendMessage(m.from, { image: { url: image10 }, caption: `\n\n*${config.CAPTION}*`}, { quoted: m });
        break;

      case 'gfx11':
        if (!args) {
          await connect('❌');
          return m.reply('Please provide a text e.g gfx11 YourTextHere');
        }
        await connect('🛡️');
        let image11 = `https://api.lolhuman.xyz/api/ephoto1/avatardota?apikey=${lolkeysapi}&text=${encodeURIComponent(args)}`;
        vorterx.sendMessage(m.from, { image: { url: image11 }, caption: `\n\n*${config.CAPTION}*`}, { quoted: m });
        break;

      case 'gfx12':
        if (!args || !args[0]) {
          await connect('❌');
          return m.reply('Please provide two texts separated by "|" e.g gfx12 Text1|Text2');
        }
        await connect('🛡️');
        let [text1_gfx12, text2_gfx12] = args[0].split('|');
        let image12 = `https://api.lolhuman.xyz/api/ephoto2/codwarzone?apikey=${lolkeysapi}&text1=${encodeURIComponent(text1_gfx12)}&text2=${encodeURIComponent(text2_gfx12)}`;
        vorterx.sendMessage(m.from, { image: { url: image12 }, caption: `\n\n*${config.CAPTION}*`}, { quoted: m });
        break;

      case 'gfx13':
        if (!args) {
          await connect('❌');
          return m.reply('Please provide a text e.g gfx13 YourTextHere');
        }
        await connect('🛡️');
        let image13 = `https://api.lolhuman.xyz/api/ephoto1/freefire?apikey=${lolkeysapi}&text=${encodeURIComponent(args)}`;
        vorterx.sendMessage(m.from, { image: { url: image13 }, caption: `\n\n*${config.CAPTION}*`}, { quoted: m });
        break;

      default:
        break;
    }
  }
};
