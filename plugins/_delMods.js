const config = require('../config');

module.exports = {
 name: 'delmod',
 category: 'Owner',
 async client(
   vorterx, m, { 
     text, 
     args, 
     quoted, 
     mentionByTag, 
     connect}) {

  if (config.mods !== text) {
    await connect('❌');
    return m.reply('*This command is for my owner only*');
  }
  await connect('✔️');
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
