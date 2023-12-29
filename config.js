//----------------------------------------
//           COPYRIGHT MIT
//            2023 @DIEGOSONTECH
//----------------------------------------
//                     |
//                     |
//                     |
//                     -------------------
let config = {
  prefix: process.env.PREFIX || '.',
  name: process.env.OWNER_NAME || '',
  ANTILINK: process.env.ANTILINK || 'true',
  CAPTION: process.env.CAPTION || 'ᴾᴼᵂᴱᴿᴱᴰ ᴮʸ ⱽᴼᴿᵀᴱᴿˣ⁶⁶⁵™',
  MENU: process.env.MENU || '',
  mods: process.env.MODS ? process.env.MODS.split(',').map(mod => mod.replace('@net.whatsapp', '')) : [],  
  MONGODB: process.env.MONGODB || '', 
  LOGOS: [
    'https://i.ibb.co/frX9YvD/OIG.jpg',
    'https://i.ibb.co/grM9VLh/091e4657090fdaa14cb3fb9f69cfa7e6.jpg',
    'https://i.imgur.com/hpH9wbL.jpg',
    'https://i.imgur.com/iO8JNjl.jpg',
    'https://i.imgur.com/5B2QhVw.jpg',
    'https://i.imgur.com/UwN0XxL.jpg',
    'https://i.imgur.com/BLfpwym.jpg',
  ],
};

module.exports = config;
