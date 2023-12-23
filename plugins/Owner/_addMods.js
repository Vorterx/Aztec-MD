const config = require('../../config.js');

module.exports = {
  name: 'setsudo',
  category: 'Owner',
  description: 'To add the user as a mod to the bot',
  async client(vorterx, m, { isDev,args, quoted, mentionByTag, connect }) {

    if (!isDev) {
      await connect('❌');
      return m.reply(`\`\`\`This command is for my owner only\`\`\``);
    }
    const sender = m.sender;
    const tag = quoted ? quoted.args : '';
    const isMod = config.mods.includes(sender);

    if (isMod) {
      await connect('✔️');
      const mods = quoted ? quoted.sender.replace('@net.whatsapp', '') : mentionByTag[0];
      if (mods) {
        config.mods.push(mods);
        vorterx.sendMessage(m.from, { text: `*User ${mods} has been promoted to moderator*` });
      } else {
        m.reply(`\`\`\`Please reply with the number you want to add to mods\`\`\``);
      }
    }
  }
};
