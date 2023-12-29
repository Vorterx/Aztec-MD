Zenith(
	{
	usage: "kick",
	alias: ["remove", "sick"],
	desc: "remove Member from group",
	category: "Group",
        filename: __filename
	}, async (vorterx, coax, react, isBotAdmin, isAdmin, mentionByTag) => {
		
    if(!isAdmin) { await react("❌"); return coax.reply(`*🔌This is admin command*`);
        }
		if(!isBotAdmin) { await react("😭"); return coax.reply(`*🔌I need to be an admin in order to use this command*`);
        }
		const mention = await mentionByTag
		if(!mention[0]) { await react("❌"); return coax.reply(`*🤔No user found*`);
        }
		await react("🙄");
		await vorterx.groupParticipantsUpdate(coax.from, [mention[0]], "remove")
		await vorterx.sendMessage(coax.from,{text:`*🎊User has been removed by ${coax.pushName}*`},{quoted: coax})
	});
