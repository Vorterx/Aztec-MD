const { Zenith } = require('../../lib/_cmd_sxntax.js');


Zenith( 
  {
usage:"gcopen",
alias: ['unmute'],
category: "Group",
desc: "To Open the group",
filename: __filename
  }, async (vorterx,m, react, {isAdmin, isBotAdmin, isGroup}) => {

if(!m.isGroup) { 
await react ("❌"); return m.reply("*👋 Sorry this command is for admins only*");
}
await react("🔉");
  m.reply(`『 GROUP SETTINGS 』\n\nGroup has been opened by admin,All participants can now send messagez`);
return await vorterx.groupSettingUpdate(m.chat, "not_announcement");
  });
