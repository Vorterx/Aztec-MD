const { Zenith } = require('../../lib/_cmd_sxntax.js');

Zenith(
  {
    usage: "file",
    desc: "to get the exact file",
    category: "Owner",
    filename: __filename
  },
  async (vorterx, coax, react, { args, text, isDev }) => {
    const { commands } = require('../../lib/_cmd_sxntax.js');

    if (!isDev) {
      await react('❌');
      return coax.reply('__Sorry, this command is for my owner__');
    }

    let aztec = [];
    
    if (!text) {
      await react('❌');
      return await coax.reply("_No text provided_");
    }

    const cmd = commands.find((cmd) => cmd.usage === text.split(" ")[0].toLowerCase());

    if (!cmd) {
      await react('❌');
      return await coax.reply("_No kind of file available, sorry_");
    }

    await react('📇');
    aztec.push(`*📍Usage:* ${cmd.usage}`);

    if (cmd.category) aztec.push(`*📇Category:* ${cmd.category}`);

    if (cmd.filename) aztec.push(`📤FileName: ${cmd.filename}`);

    return coax.reply(aztec.join('\n'));
  }
);
