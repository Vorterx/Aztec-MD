module.exports = {
  name: 'reboot',
  category: 'Owner',
  description: 'Reboot the bot like a boss',
  async client(vorterx, m, { isDev, text, args, connect }) {
  
    if (!isDev) {
      await connect('❌');
      return m.reply('🚫 Only my Dev can unleash the power of reboot');
    }

    await connect('🔄');

    m.reply('```\n🔄 Initiating the bot reboot sequence...\n\n' +
      'function rebootBot() {\n' +
      '  console.log("Rebooting...");\n' +
      '  setTimeout(() => {\n' +
      '    console.log("Done rebooting. The bot is now online");\n' +
      '    vorterx.sendMessage(m.from, { text: "Done rebooting. The bot is now online"});\n' +
      '  }, 2000);\n' +
      '  process.exit(0);\n' +
      '}\n\n' +
      'rebootBot();\n' +
      '```');
  }
};
