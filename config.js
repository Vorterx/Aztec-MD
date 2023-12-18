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
  CAPTION: process.env.CAPTION || 'ᴾᴼᵂᴱᴿᴱᴰ ᴮʸ ⱽᴼᴿᵀᴱᴿˣ⁶⁶⁵™',
  menu: process.env.MENU || '',
  THUMB: process.env.THUMB || 'https://imageupload.io/69vJBZbn4iPqWTZ',
  auto_read_status: process.env.AUTO_READ_STATUS || 'true',
  worktype: process.env.WORKTYPE || '',
  mods: process.env.MODS ? process.env.MODS.split(',').map(mod => mod.replace('@net.whatsapp', '')) : [],  
  MONGODB: process.env.MONGODB || '', 
  LOGOS: [
    'https://i.ibb.co/frX9YvD/OIG.jpg',
  ],
};

module.exports = config;
