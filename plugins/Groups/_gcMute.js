const { Zenith } = require ('../../lib/_cmd_sxntax.js');

Zenith(
    {
usage: "gcclose",
alias: ["mute"],
desc: "To close the group",
category: "Group",
filename: __filename
}, async (vorterx, m, react, {isGroup}) => {

if(!m.isGroup) { 
await react("❌"); return m.reply("*👋 Sorry this command is for admins*");
}
await react("🔉");
    m.reply(`『 GROUP SETTINGS 』\n\nGroup has been closed by admin,All participants cannot send messagez`);
return await vorterx.groupSettingUpdate(m.chat, "announcement");
  });
