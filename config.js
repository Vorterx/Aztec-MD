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
    'https://i.imgur.com/b2hxyEv.jpg',
    'https://i.imgur.com/Uz0dhe0.jpg',
    'https://i.imgur.com/q3JQMYi.jpg',
    'https://i.imgur.com/8nIF6dX.jpg',
    'https://i.imgur.com/yvg67ya.jpg',
    'https://i.imgur.com/51FVug1.jpg',
    'https://i.imgur.com/KiEvvNC.jpg',
    'https://i.imgur.com/JhGlSkY.jpg',
    'https://i.imgur.com/9BgK9VL.jpg',
    'https://i.imgur.com/QqOODkW.jpg',
    'https://i.imgur.com/jDqb6bN.jpg',
    'https://i.imgur.com/Auv1lTF.jpg',
    
  ],
};

module.exports = config;
