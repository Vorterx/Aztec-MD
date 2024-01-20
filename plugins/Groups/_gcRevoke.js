const { Zenith } = require('../../lib/functions');

Zenith(
  {
    usage: 'revoke',
    desc: 'Revoke group link',
    category: 'Group',
  },
  async (vorterx, m, react, { isGroup, isBotAdmin }) => {
   
    if (!m.isGroup) {
      await react('❌');
      return m.reply('*_This command is for groups_*');
    } else if (!isBotAdmin) {
      await react('❌');
      return m.reply('*_I am not an admin_*');
    }

    await vorterx.groupRevokeInvite(m.chat);
    m.reply('*_Done_*');
  }
);
        
