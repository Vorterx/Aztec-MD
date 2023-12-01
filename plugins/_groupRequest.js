const { MessageType } = require("@whiskeysockets/baileys");

module.exports = { name: "(listrequest|look)", category: "Group", description: "To check the requests on a group from users who want to join", async xstart(vorterx, m, { args, mime, isBotAdmin, isAdmin, isGroup, quoted, text, xReact }) {
  
    if (!isBotAdmin) {
      await xReact('❌');
      return m.reply("I'm not an admin and can't process the command.");
    }
    if (!m.isGroup) {
      await xReact('❌');
        return m.reply("This command is for group admins only.");
    }
    if (!isAdmin) {
      await xReact('❌');
      return m.reply("Im not an admin of the group");
    }
    try {
      const List = await vorterx.groupQueryJoin(m.chat);
      let res = "╭────《  *REQUESTERS*";
       List.forEach((user, index) => {
        res += `\n│${user.jid}`;
      });
      res += "\n└────◉";
 
      await vorterx.sendMessage(m.from, res);
    } catch (error) {
      console.error(error);
      m.reply("__An error occurred");
    }
  },
};
