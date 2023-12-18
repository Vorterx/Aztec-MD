module.exports = {
name:"gcclose",
alias: ["mute"],
description: "To close the group",
category: "Group",
async client(vorterx, m, { connect, isGroup }) {

if(!m.isGroup) { 
await connect("❌"); return m.reply("*👋 Sorry this command is for admins*");
}
await connect("🔉");
    m.reply(`『 GROUP SETTINGS 』\n\nGroup has been closed by admin,All participants cannot send messagez`);
return await vorterx.groupSettingUpdate(m.from, "announcement");
  }
};
