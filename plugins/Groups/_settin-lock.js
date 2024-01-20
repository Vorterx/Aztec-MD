const { Zenith } = require('../../lib/functions');

Zenith(
  {
    usage: 'settin-lock',
    desc: 'To lock group edit settin',
    category: 'Group',
  },
  async (vorterx, m, react, { isGroup, isBotAdmin }) => {
    if (!m.isGroup) {
      await react('❌');
      return m.reply('*_This command can only be used in groups_*');
    } else if (!isBotAdmin) {
      await react('❌');
      return m.reply('*_I am not an admin_*');
    }

    await react('🌀');
    await vorterx.groupSettingUpdate(m.chat, 'locked');
    m.reply('*_Group is locked now everyone cannot edit the group settings_*');
  }
);
