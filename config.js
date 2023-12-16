//----------------------------------------
//           COPYRIGHT MIT
//            2023 @DIEGOSONTECH
//----------------------------------------
//                     |
//                     |
//                     |
//                     -------------------
let config = {
  botName: process.env.BOTNAME || 'AZTEC MD',
  prefix: process.env.PREFIX || '.',
  name: process.env.OWNER_NAME || '',
  owner_number: process.env.OWNER_NUMBER || '27686881509',
  SESSION_ID: process.env.SESSION_ID || 'add something',
  ANTILINK: process.env.ANTILINK || 'true',
  CAPTION: process.env.CAPTION || '𝙿𝙾𝚆𝙴𝚁𝙴𝙳 𝙱𝚈 𝚅𝙾𝚁𝚃𝙴𝚁𝚇',
  menu: process.env.MENU || '', // 2 is the default menu Aztec, 0 is Suhail MD menu
  THUMB: process.env.THUMB || 'https://imageupload.io/69vJBZbn4iPqWTZ',
  auto_read_status: process.env.AUTO_READ_STATUS || 'true',
  worktype: process.env.WORKTYPE || '',
  mods: process.env.MODS ? process.env.MODS.split(',').map(mod => mod.replace('@net.whatsapp', '')) : [],
  LANG: process.env.LANG || 'VOR_TERX',
  MONGODB: process.env.MONGODB || '', // add mongodb url
  LOGOS: [
    'https://image.com/image1.jpg',
    'https://gif.com/video1.mp4',
    'https://vorterx.com/image2.jpg',
    'https://aztec.com/video2.mp4',
  ],
};

module.exports = config;
