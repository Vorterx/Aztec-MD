//@©2023
module.exports = {
  name: "gcname",
  description: "Change the group name",
  category: "Group",
  async client(vorterx, m, { text, isBotAdmin, isGroup, connect }) {
    if (!isGroup) {
      await connect("⛔");
      return m.reply("⛔️ *This command is only for group admins.*");
    }

    if (!isBotAdmin) {
      await connect("⛔");
      return m.reply("⛔️ *I need to be an admin to use this command.*");
    }

      if (!text) {
      await connect("⛔");
      return m.reply("⛔️ *Please provide the new group name you want to update to.*");
    }

    await connect("🔉");

    const D3centX = [
      "🎉 Group name successfully changed! 🎊",
      "✨ The group name has been updated! ✨",
      "🔥 New group name set! 🔥",
      "🌟 Group name has been modified! 🌟",
      "💥 Group name successfully updated! 💥",
    ];

    const randomD3centX = D3centX[Math.floor(Math.random() * D3centX.length)];
    const caption = `*${randomD3centX}*\n\n🏷️ New group name: ${text}`;

    await vorterx.groupUpdateSubject(m.from, text);
    await m.reply(caption);
   },
  };
