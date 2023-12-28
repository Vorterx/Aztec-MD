/*
* @Author: DiegosonTech
* @BotName: Aztec-MD 
*/

const { fancytext } = require('@viper-x/fancytext'); // Changed 'tiny' to 'fancytext'
const config = require('../../config.js');

module.exports = {
  name: 'mods',
  alias: ['sudo'],
  description: 'To check mods admins to the bot',
  category: 'Owner',
  async client(vorterx, m, { text, args, quoted, connect }) {
   await connect ('✔️');
    
    let mods = process.env.MODS ? process.env.MODS.split(',').map(mod => mod.replace('@net.whatsapp', '').trim()) : [];
    let me = mods.map((mod, index) => `  ${index + 1} 〄 @${mod}\n\n`).join('');
    let mention = [m.sender, ...mods.map(mod => `${mod}@s.whatsapp.net`)];

    if (!me || !mods || !mods[0]) return await m.reply("*There's no mods added yet...*");
    
    let str = `
    👤 *${config.botName.toUpperCase().trim()} MODS* 👤\n\n${me}`.trim();
    
    return await m.reply("https://telegra.ph/file/5fd51597b0270b8cff15b.png", {
      caption: str,
      mentions: mention
    }, "img", m);
  }
};
      
