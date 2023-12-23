const { execSync } = require('child_process');

module.exports = { 
  name: 'update', 
  category: 'Owner', 
  async client(vorterx, m, { args, isDev, connect, quoted }) {
   
    if (!isDev) {
      await connect('❌');
      return m.reply('You do not have permission to use this command...');
    }

    await connect('⏳');
    const rootDirectory = execSync('git rev-parse --show-toplevel', { encoding: 'utf-8' }).trim();

    exec(`git pull https://github.com/Vorterx/Aztec-MD master`, { cwd: rootDirectory }, (err, stdout, stderr) => {
      if (err) {
        console.error(err);
        return m.reply('An error occurred while updating the bot...');
      }
      if (stdout.includes('..._Already up to date_..')) {
        m.reply('No updates available. Bot is already up to date...');
      } else {
        m.reply(`*AVAILABLE UPDATES*:\n\`\`\`${stdout}\`\`\``);
      }
    });
  }
};
