Zenith(
    {
    usage: "tagall",
    category: "Group",
    desc: "tag members",
    filename: __filename
    }, async (vorterx, coax, args, react, isBotAdmin, isAdmin, isMedia, participants) => {
      
        if (!isMedia) {
            var message2 = coax.quoted
                ? coax.quoted.msg
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
        vorterx.sendMessage(coax.from,
            { text: mess, mentions: participants.map((a) => a.id) },
            { quoted: coax }
        );
    });
