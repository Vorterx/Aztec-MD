const { Zenith } = require ('../../lib/_cmd_sxntax.js');


Zenith( 
  {
usage:"gcopen",
alias: ['unmute'],
category: "Group",
desc: "To Open the group",
filename: __filename
  }, async (vorterx, coax, react, isAdmin, isBotAdmin, isGroup) => {

if(!coax.isGroup) { 
await react ("❌"); return coax.reply("*👋 Sorry this command is for admins only*");
}
await react("🔉");
  coax.reply(`『 GROUP SETTINGS 』\n\nGroup has been opened by admin,All participants can now send messagez`);
return await vorterx.groupSettingUpdate(coax.from, "not_announcement");
  });
