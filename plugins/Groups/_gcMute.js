const { Zenith } = require ('../../lib/_cmd_sxntax.js');

Zenith(
    {
usage: "gcclose",
alias: ["mute"],
desc: "To close the group",
category: "Group",
filename: __filename
}, async (vorterx, coax, react, isGroup) => {

if(!coax.isGroup) { 
await react("❌"); return coax.reply("*👋 Sorry this command is for admins*");
}
await react("🔉");
    coax.reply(`『 GROUP SETTINGS 』\n\nGroup has been closed by admin,All participants cannot send messagez`);
return await vorterx.groupSettingUpdate(coax.from, "announcement");
  });
