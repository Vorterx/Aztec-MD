async (vorterx, coax, react) => {
  const ChatBot = require('../../lib/_dbase/_brainshop.js');
  const checkBot = await ChatBot.findOne({ userId: 'chatbot' }) || await new ChatBot({ userId: 'chatbot' }).save();
  let isBotOn = checkBot.preferences.isBotOn;

  if (icmd) {
    const command = icmd.toLowerCase();
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

  if (isBotOn && !icmd) {
    const doQuiz = coax.text.length;
    try {
      if (coax.isGroup && !coax.quoted && !icmd) return;
      if (coax.text && !coax.isGroup) {
        if (doQuiz < 60) {
          vorterx.sendPresenceUpdate('composing', coax.from);
          const users = coax.sender.split("@")[0];
          const fe = require("node-fetch");
          const textuser = budy;

          const fetchtext = await fe(`http://api.brainshop.ai/get?bid=176554&key=2ISncNBhocwGt3Cw&uid=[${users}]&msg=[${textuser}]`);
          const json = await fetchtext.json();
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
  
