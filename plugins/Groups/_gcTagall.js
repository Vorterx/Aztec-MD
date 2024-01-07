const { Zenith } = require('../../lib/_cmd_sxntax.js');


Zenith(
    {
    usage: "tagall",
    category: "Group",
    desc: "tag members",
    filename: __filename
    }, async (vorterx,m, react, {args,isBotAdmin, isAdmin, isMedia, participants}) => {
      
        if (!isMedia) {
            var message2 = m.quoted
                ? m.quoted.msg
                : args || "";
        } else {
            message2 = "";
        }

        let mess = `╭─❮❮ Tᴀɢɢɪɴɢ Aʟʟ ❯❯\n`;
        for (let mem of participants) {
            mess += `│ @${mem.id.split("@")[0]}\n`;
        }
        mess += `╰────────────⦿\n\n`;

        await react("📇");
        vorterx.sendMessage(m.chat,
            { text: mess, mentions: participants.map((a) => a.id) },
            { quoted: m }
        );
    });
