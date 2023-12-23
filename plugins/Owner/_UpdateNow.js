/*
* @Author: DiegosonTech
* @BotName: Aztec-MD
*/

const { exec } = require('child_process');

module.exports = { 
  name: 'update now', 
  category: 'Owner', 
  async client(vorterx, m, { text, args, isDev, connect, quoted }) {

    if (!isDev) {
      await connect('❌');
      return m.reply('You do not have permission to use this command...');
    }

     await connect('✔️');
    exec('git fetch https://github.com/Vorterx/Aztec-MD master && git reset --hard FETCH_HEAD', { cwd: '.' }, (err, stdout, stderr) => {
      if (err) {
        console.error(err);
        return m.reply('An error occurred while updating the bot...');
      }

      m.reply('✔️Bot successfully updated with the latest commits...');
    });
  }
};
