const { exec } = require('child_process');

module.exports = { 
  name: 'update', 
  category: 'Owner', 
  async client(vorterx, m, { text, args, isDev, connect, quoted }) {

    if (!isDev) {
      await connect('❌');
      return m.reply('You do not have permission to use this command...');
    }

    await connect('⏳');
    exec('git pull https://github.com/Vorterx/Aztec-MD master', { cwd: '.' }, (err, stdout, stderr) => {
      if (err) {
        console.error(err);
        return m.reply('An error occurred while updating the bot...');
      }
      m.reply(`*AVILABLE UPDATES*:\n\`\`\`${stdout}\`\`\``);
    });
  }
};
