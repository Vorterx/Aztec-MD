async (vorterx, coax, react) => {
  const ChatBot = require('../../lib/_dbase/_brainshop.js');
  const { cmd } = require('../../lib/client.js');
  const checkBot = await ChatBot.findOne({ userId: 'chatbot' }) || await new ChatBot({ userId: 'chatbot' }).save();
  let isBotOn = checkBot.preferences.isBotOn;

  if (cmd) {
    const command = cmd.toLowerCase();
    if (command === 'bot on') {
      await react('🙂');
      isBotOn = true;
      await ChatBot.updateOne({ userId: 'chatbot' }, { 'preferences.isBotOn': true });
      coax.reply('🙂ChatBot is now turned on!...');
      return;
    } else if (command === 'bot off') {
      await react('🤕');
      isBotOn = false;
      await ChatBot.updateOne({ userId: 'chatbot' }, { 'preferences.isBotOn': false });
      coax.reply('🤕ChatBot is now turned off!..');
      return;
    }
  }

  if (isBotOn && !cmd) {
    const doQuiz = coax.text.length;
    try {
      if (coax.isGroup && !coax.quoted && !cmd) return;
      if (coax.text && !coax.isGroup) {
        if (doQuiz < 60) {
          vorterx.sendPresenceUpdate('composing', coax.from);
          const users = coax.sender.split("@")[0];
          const fetch = async (url) => (await import('node-fetch')).default(url);
          const results = budy;
          const fetch = await fe(`http://api.brainshop.ai/get?bid=176554&key=2ISncNBhocwGt3Cw&uid=[${users}]&msg=[${results}]`);
          const json = await fetch.json();
          const { aztec } = json;
          coax.reply(aztec);
          return;
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
}
  
