const { Zenith } = require ('../../lib/_cmd_sxntax.js');

Zenith(
  {
    usage: "file",
    desc: "to get extact file",
    category: "Owner",
    filename: __filename
}, async(vorterx, coax, args, text, isDev) => {
 const { commands } = require('../../lib/_cmd_sxntax.js');
if(!isDev) {
  await react('❌');
  return coax.reply('__Sorry this command is for my owner__');
}
    let aztec = [];
        const cmd = commands.find((cmd) => cmd.usage === (text.split(" ")[0].toLowerCase()))
        if (!cmd) {
          await react('❌')
            return await coax.reply("_No kinda file available sorry_");
        }
      await react('📇');
        else aztec.push(`*📍Usage:* ${cmd.usage}`);
       
    if (cmd.category) aztec.push(`*📇Category:* ${cmd.category}`);
      
    if(cmd.filename) aztec.push(`📤FileName: ${cmd.filename}`)
        
    return coax.reply(aztec.join('\n'));

})
