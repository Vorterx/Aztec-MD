module.exports = {
	name: "kick",
	alias: ["remove", "sick"],
	description: "remove Member from group",
	category: "Group",
  async client(vorterx, m, {  connect, isBotAdmin, isAdmin, mentionByTag}) {
		
    if(!isAdmin) { await connect("❌"); return m.reply(`*🔌This is admin command*`);
        }
		if(!isBotAdmin) { await connect("😭"); return m.reply(`*🔌I need to be an admin in order to use this command*`);
        }
		const mention = await mentionByTag
		if(!mention[0]) { await connect("❌"); return m.reply(`*🤔No user found*`);
        }
		await connect("🎊");
		await vorterx.groupParticipantsUpdate(m.from, [mention[0]], "remove")
		await vorterx.sendMessage(m.from,{text:`*🎊User has been removed by ${pushName}*`},{quoted:m})
	},
                    }
