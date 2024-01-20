const { Zenith } = require('../../lib/functions');

Zenith(
  {
    usage: 'invite',
    desc: 'Gc invite link',
    category: 'Group',
  },
  async (vorterx, m, react, { isGroup }) => {
   
    if (!m.isGroup) {
      await react('❌');
      return m.reply('*_This command can only be used in groups_*');
    }

    await react('🌀');
    const INVITE_CODE = await vorterx.groupInviteCode(m.chat);

    if (INVITE_CODE) {
      const caption = `*乂 INVITED GC 乂*\n\n
    ${m.pushName}\n\n*〄 HERE IS THE INVITE LINK*\n\n*〄 CODE: https://chat.whatsapp.com/${INVITE_CODE}`;
      m.reply('*_Please check your inbox for the group invitation link_*');
      vorterx.sendMessage(m.sender, { text: caption });
    } else {
      const E3RR = 'Error fetching group invitation code';
      console.error(E3RR);
      await react('❌');
      return m.reply(`*_${E3RR}_*`);
    }
  }
);
