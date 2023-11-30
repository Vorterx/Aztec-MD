 module.exports = {
  name: '(admod|setsudo)',
  category: 'Owner',
   description: 'To add the user as a mod to the bot',
  async xstart(vorterx, m, { text, args, quoted, mentionByTag, xReact }) {

    if (!process.env.MODS) {
      await xReact('❌');
      return m.reply(`\`\`\`This command is for my ownr only\`\`\``);
    }
    const sender = m.sender;
    const tag = quoted ? quoted.text : '';     
    const isMod = process.env.MODS.includes(sender);

    if (isMod) { 
      await xReact('✔️');
      const mods = quoted ? quoted.sender : mentionByTag[0];
      if (mods) {
        process.env.MODS += `,${mods}`;        
        vorterx.sendMessage(m.from, { text: `*User  ${mods} has been promoted to moderator*`});
      } else {        
        m.reply(`\`\`\`Please reply with the number you want to add to mods\`\`\``);
      }      
    }
  }
};
