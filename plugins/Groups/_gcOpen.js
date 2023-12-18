module.exports = {
name:"gcopen",
alias: ['unmute'],
description: "To Open the group",
category: "Group",
async client(vorterx, m, { connect, isAdmin, isBotAdmin, isGroup}) {

if(!m.isGroup) { 
await connect("❌"); return m.reply("*👋 Sorry this command is for admins only*");
}
await connect("🔉");
  m.reply(`『 GROUP SETTINGS 』\n\nGroup has been opened by admin,All participants can now send messagez`);
return await vorterx.groupSettingUpdate(m.from, "not_announcement");
  }
};
