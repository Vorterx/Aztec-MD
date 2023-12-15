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
  session_Id: process.env.SESSION_ID || 'add something',
  antilink: process.env.ANTILINK || 'true',
  menu: process.env.MENU || '', // 2 is the default menu Aztec, 0 is Suhail MD menu
  thumb: process.env.THUMB || 'https://imageupload.io/69vJBZbn4iPqWTZ',
  auto_read_status: process.env.AUTO_READ_STATUS || 'true',
  worktype: process.env.WORKTYPE || '',
  mods: process.env.MODS ? process.env.MODS.split(',').map(mod => mod.replace('@net.whatsapp', '')) : [],
  LANG: process.env.LANG || 'VOR_TERX',
  mongodb: process.env.MONGODB || '',//add mongodb url
};

module.exports = config;
