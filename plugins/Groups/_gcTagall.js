module.exports = {
    name: "tagall",
    description: "tag members",
    category: "Group",
    async client(vorterx, m, { text, connect, isBotAdmin, isAdmin, isMedia, participants }) {
      
        if (!isMedia) {
            var message2 = m.quoted
                ? m.quoted.msg
                : text || "";
        } else {
            message2 = "";
        }

        let mess = `╭─❮❮| Tᴀɢɢɪɴɢ Aʟʟ |❯❯\n`;
        for (let mem of participants) {
            mess += `│ @${mem.id.split("@")[0]}\n`;
        }
        mess += `╰────────────⦿\n\n`;

        await connect("📇");
        vorterx.sendMessage(m.from,
            { text: mess, mentions: participants.map((a) => a.id) },
            { quoted: m }
        );
    },
};
