const { Zenith } = require('../../lib/functions');

Zenith(
  {
    usage: 'settin-unlock',
    desc: 'To open group settin',
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
    await vorterx.groupSettingUpdate(m.chat, 'unlocked');
    m.reply('*_Group unlocked now everyone can edit the group settings_*');
  }
);
  
