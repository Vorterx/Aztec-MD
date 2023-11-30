const config = require('../config');

module.exports = {
 name: ('delmod|removemd'),
 category: 'Owner',
 async xstart(
   vorterx, m, { 
     text, 
     args, 
     quoted, 
     mentionByTag, 
     config }) {

  if (config.mods !== text) {
    await xReact('❌');
    return m.reply('*This command is for my owner only*');
  }
  await xReact('✔️');
  let mods = config.mods.split(',');
  const mentionedId = m.quoted ? m.quoted.sender : mentionByTag[0];
  const index = mods.indexOf(mentionedId);
  if (index !== -1) {
    mods.splice(index, 1);
  }
  config.mods = mods.join(',');
  const res = '✔️__Successfully removed the moder__';

  vorterx.sendMessage(m.from, res, MessageType.text);
  }
};
