const { Zenith } = require ('../../lib/_cmd_sxntax.js');

Zenith(
	{
	usage: "kick",
	alias: ["remove", "sick"],
	desc: "remove Member from group",
	category: "Group",
        filename: __filename
	}, async (vorterx, m, react, {isBotAdmin, isAdmin, mentionByTag}) => {
		
    if(!isAdmin) { await react("❌"); return m.reply(`*🔌This is admin command*`);
        }
		if(!isBotAdmin) { await react("😭"); return m.reply(`*🔌I need to be an admin in order to use this command*`);
        }
		const mention = await mentionByTag
		if(!mention[0]) { await react("❌"); return m.reply(`*🤔No user found*`);
        }
		await react("🙄");
		await vorterx.groupParticipantsUpdate(m.chat, [mention[0]], "remove")
		await vorterx.sendMessage(m.chat,{text:`*🎊User has been removed by ${m.pushName}*`},{quoted: m})
	});
