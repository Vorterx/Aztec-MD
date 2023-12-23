module.exports = {
  name: 'reboot',
  category: 'Owner',
  description: 'Reboot the bot like a boss',
  async client(vorterx, m, { isDev, args, connect }) {
  
    if (!isDev) {
      await connect('❌');
      return m.reply('🚫 Only my Dev can unleash the power of reboot');
    }

    await connect('🔄');

    m.reply('Rebooting the bot...');

    setTimeout(() => {
      vorterx.sendMessage(m.from, { text: 'Done rebooting. The bot is now online'});
      process.exit(0);
    }, 2000);
  }
};
