/*
* @Author: DiegosonTech
* @BotName: Aztec-MD 
*/

const { tiny } = require('@viper-x/fancytext');
const config = require('../../config.js');

Zenith(
  {
  usage: 'mods',
  alias: ['sudo'],
  desc: 'To check mods admins to the bot',
  category: 'Owner',
  filename: __filename
  }, async (vorterx, coax, args, quoted, react) => {
    
    await react('✔️');
    let mods = process.env.MODS ? process.env.MODS.split(',').map(mod => mod.replace('@net.whatsapp', '').trim()) : [];
    let me = mods.map((mod, index) => `  ${index + 1} 〄 @${mod}\n\n`).join('');
    let mention = [m.sender, ...mods.map(mod => `${mod}@s.whatsapp.net`)];

    if (!me || !mods || !mods[0]) return await vorterx.sendMessage(coax.from, "*There's no mods added yet...*", 'text', { quoted: coax });

    let str = `
${tiny('👤 *AZTEC-MD MODS* 👤')}\n\n${me}`.trim();
    await vorterx.sendMessage(coax.from, {
      image: { url: "https://telegra.ph/file/5fd51597b0270b8cff15b.png" },
      caption: str,
      mentions: mention,
      quoted: coax
    });
  })
      
