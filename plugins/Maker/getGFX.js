const config = require('../../config.js');
const { Zenith } = require('../../lib/_cmd_sxntax.js');
let lolkeysapi = '5c250069e8936d6bf70295b8';
const caliphkey = 'lykoUzNh';

Zenith({
  usage: 'gfx1',
  category: 'GFX 3D',
  desc: 'Create logos using gfx',
  filename: __filename
}, async (vorterx, m, react, { args }) => {
  if (!args) {
    await react('❌');
    return m.reply('Please provide a text e.g gfx1 DiegosonTech');
  }
  await react('🛡️');
  let image1 = `https://api.caliph.biz.id/api/kaneki?nama=${encodeURIComponent(args)}&apikey=caliphkey`;
  vorterx.sendMessage(m.chat, { image: { url: image1 }, caption: `\n\n*${config.CAPTION}*` }, { quoted: m });
});

// ....................................................
// ....................................................

Zenith({
  usage: 'gfx2',
  category: 'GFX 3D',
  desc: 'Create gfx logo',
  filename: __filename
}, async (vorterx, m, react, { args }) => {
  if (!args || !args[0]) {
    await react('❌');
    return m.reply('Please provide two texts separated by "|" e.g gfx2 DiegosonTech|Aztec');
  }
  await react('🛡️');
  let [text1, text2] = args[0].split('|');
  let image2 = `https://api.caliph.biz.id/api/girlneko2?nama1=${encodeURIComponent(text1)}&nama2=${encodeURIComponent(text2)}&apikey=caliphkey`;
  vorterx.sendMessage(m.chat, { image: { url: image2 }, caption: `\n\n*${config.CAPTION}*` }, { quoted: m });
});

// ....................................................
// ....................................................

Zenith({
  usage: 'gfx3',
  category: 'GFX 3D',
  desc: 'Create textpro matrix logo',
  filename: __filename
}, async (vorterx, m, react, { args }) => {
  if (!args) {
    await react('❌');
    return m.reply('Please provide a text e.g gfx3 YourTextHere');
  }
  await react('🛡️');
  let image3 = `https://api.caliph.biz.id/api/textpro/matrix?text=${encodeURIComponent(args)}&apikey=caliphkey`;
  vorterx.sendMessage(m.chat, { image: { url: image3 }, caption: `\n\n*${config.CAPTION}*` }, { quoted: m });
});

// ....................................................
// ....................................................

Zenith({
  usage: 'gfx4',
  category: 'GFX 3D',
  desc: 'Create textprome jokerlogo',
  filename: __filename
}, async (vorterx, m, react, { args }) => {
  if (!args) {
    await react('❌');
    return m.reply('Please provide a text e.g gfx4 YourTextHere');
  }
  await react('🛡️');
  let image4 = `https://api.lolhuman.xyz/api/textprome/jokerlogo?apikey=${lolkeysapi}&text=${encodeURIComponent(args)}`;
  vorterx.sendMessage(m.chat, { image: { url: image4 }, caption: `\n\n*${config.CAPTION}*` }, { quoted: m });
});

// ....................................................
// ....................................................

Zenith({
  usage: 'gfx5',
  category: 'GFX 3D',
  desc: 'Create textpro matrix logo (similar to gfx3)',
  filename: __filename
}, async (vorterx, m, react, { args }) => {
  if (!args) {
    await react('❌');
    return m.reply('Please provide a text e.g gfx5 YourTextHere');
  }
  await react('🛡️');
  let image5 = `https://api.caliph.biz.id/api/textpro/matrix?text=${encodeURIComponent(args)}&apikey=caliphkey`;
  vorterx.sendMessage(m.chat, { image: { url: image5 }, caption: `\n\n*${config.CAPTION}*` }, { quoted: m });
});

// ....................................................
// ....................................................

Zenith({
  usage: 'gfx6',
  category: 'GFX 3D',
  desc: 'Create textprome2 lionlogo',
  filename: __filename
}, async (vorterx, m, react, { args }) => {
  if (!args || !args[0]) {
    await react('❌');
    return m.reply('Please provide two texts separated by "|" e.g gfx6 Text1|Text2');
  }
  await react('🛡️');
  let [text1_gfx6, text2_gfx6] = args[0].split('|');
  let image6 = `https://api.lolhuman.xyz/api/textprome2/lionlogo?apikey=${lolkeysapi}&text1=${encodeURIComponent(text1_gfx6)}&text2=${encodeURIComponent(text2_gfx6)}`;
  vorterx.sendMessage(m.chat, { image: { url: image6 }, caption: `\n\n*${config.CAPTION}*` }, { quoted: m });
});

// ....................................................
// ....................................................

Zenith({
  usage: 'gfx7',
  category: 'GFX 3D',
  desc: 'Create photooxy2 battlefield4',
  filename: __filename
}, async (vorterx, m, react, { args }) => {
  if (!args || !args[0] || !args[1]) {
    await react('❌');
    return m.reply('Please provide two texts separated by "|" e.g gfx7 Text1|Text2');
  }
  await react('🛡️');
  let text1_gfx7 = args[0] ? args[0].trim() : '';
  let text2_gfx7 = args[1] ? args[1].trim() : '';
  let image7 = `https://api.lolhuman.xyz/api/photooxy2/battlefield4?apikey=${lolkeysapi}&text1=${encodeURIComponent(text1_gfx7)}&text2=${encodeURIComponent(text2_gfx7)}`;
  vorterx.sendMessage(m.chat, { image: { url: image7 }, caption: `\n\n*${config.CAPTION}*` }, { quoted: m });
});

// ....................................................
// ....................................................

Zenith({
  usage: 'gfx8',
  category: 'GFX 3D',
  desc: 'Create photooxy2 battlefield4 (similar to gfx7)',
  filename: __filename
}, async (vorterx, m, react, { args }) => {
  if (!args || !args[0] || !args[1]) {
    await react('❌');
    return m.reply('Please provide two texts separated by "|" e.g gfx8 Text1|Text2');
  }
  await react('🛡️');
  let text1_gfx8 = args[0] ? args[0].trim() : '';
  let text2_gfx8 = args[1] ? args[1].trim() : '';
  let image8 = `https://api.lolhuman.xyz/api/photooxy2/battlefield4?apikey=${lolkeysapi}&text1=${encodeURIComponent(text1_gfx8)}&text2=${encodeURIComponent(text2_gfx8)}`;
  vorterx.sendMessage(m.chat, { image: { url: image8 }, caption: `\n\n*${config.CAPTION}*` }, { quoted: m });
});

// ....................................................
// ....................................................

Zenith({
  usage: 'gfx9',
  category: 'GFX 3D',
  desc: 'Create ephoto1 anonymhacker',
  filename: __filename
}, async (vorterx, m, react, { args }) => {
  if (!args) {
    await react('❌');
    return m.reply('Please provide a text e.g gfx9 YourTextHere');
  }
  await react('🛡️');
  let image9 = `https://api.lolhuman.xyz/api/ephoto1/anonymhacker?apikey=${lolkeysapi}&text=${encodeURIComponent(args)}`;
  vorterx.sendMessage(m.chat, { image: { url: image9 }, caption: `\n\n*${config.CAPTION}*` }, { quoted: m });
});

// ....................................................
// ....................................................

Zenith({
  usage: 'gfx10',
  category: 'GFX 3D',
  desc: 'Create ephoto1 avatarlolnew',
  filename: __filename
}, async (vorterx, m, react, { args }) => {
  if (!args) {
    await react('❌');
    return m.reply('Please provide a text e.g gfx10 YourTextHere');
  }
  await react('🛡️');
  let image10 = `https://api.lolhuman.xyz/api/ephoto1/avatarlolnew?apikey=${lolkeysapi}&text=${encodeURIComponent(args)}`;
  vorterx.sendMessage(m.chat, { image: { url: image10 }, caption: `\n\n*${config.CAPTION}*` }, { quoted: m });
});

// ....................................................
// ....................................................

Zenith({
  usage: 'gfx11',
  category: 'GFX 3D',
  desc: 'Create ephoto1 avatardota',
  filename: __filename
}, async (vorterx, m, react, { args }) => {
  if (!args) {
    await react('❌');
    return m.reply('Please provide a text e.g gfx11 YourTextHere');
  }
  await react('🛡️');
  let image11 = `https://api.lolhuman.xyz/api/ephoto1/avatardota?apikey=${lolkeysapi}&text=${encodeURIComponent(args)}`;
  vorterx.sendMessage(m.chat, { image: { url: image11 }, caption: `\n\n*${config.CAPTION}*` }, { quoted: m });
});

// ....................................................
// ....................................................

Zenith({
  usage: 'gfx12',
  category: 'GFX 3D',
  desc: 'Create ephoto2 codwarzone',
  filename: __filename
}, async (vorterx, m, react, { args }) => {
  if (!args || !args[0]) {
    await react('❌');
    return m.reply('Please provide two texts separated by "|" e.g gfx12 Text1|Text2');
  }
  await react('🛡️');
  let [text1_gfx12, text2_gfx12] = args[0].split('|');
  let image12 = `https://api.lolhuman.xyz/api/ephoto2/codwarzone?apikey=${lolkeysapi}&text1=${encodeURIComponent(text1_gfx12)}&text2=${encodeURIComponent(text2_gfx12)}`;
  vorterx.sendMessage(m.chat, { image: { url: image12 }, caption: `\n\n*${config.CAPTION}*` }, { quoted: m });
});

// ....................................................
// ....................................................

Zenith({
  usage: 'gfx13',
  category: 'GFX 3D',
  desc: 'Create ephoto1 freefire',
  filename: __filename
}, async (vorterx, m, react, { args }) => {
  if (!args) {
    await react('❌');
    return m.reply('Please provide a text e.g gfx13 YourTextHere');
  }
  await react('🛡️');
  let image13 = `https://api.lolhuman.xyz/api/ephoto1/freefire?apikey=${lolkeysapi}&text=${encodeURIComponent(args)}`;
  vorterx.sendMessage(m.chat, { image: { url: image13 }, caption: `\n\n*${config.CAPTION}*` }, { quoted: m });
});
