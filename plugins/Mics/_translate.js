/*
* @Author: DiegosonTech
* @BotName: Aztec-MD 
*/

const { translate } = require('@vitalets/google-translate-api');
const config = require('../../config.js');

Zenith(
  {
  usage: 'tr',
  alias: ['translate','trt'],
  desc: 'Translate any usable language',
  category: 'Mics',
  filename: __filename
  }, async (vorterx, coax, args, react) => {
    
    if (!args) {
      await react('❌');
      return coax.reply('Example: tr zu Damn l love this Diegoson eish');
    }

    let lang;
    let data;

    if (args && coax.quoted && coax.quoted.args) {
      lang = args.slice(0, 2);
      data = coax.quoted.args;
    } else if (args) {
      lang = args.slice(0, 2);
      data = args.substring(2).trim();
    }

    try {
      await react('📝');
      const result = await translate(data, { to: lang });
      const caption = `*📝TEXT*: ${data}\n\n*🧘TRANSLATED*: ${result.text}\n\n*${config.CAPTION}*`;
      await coax.reply(caption);
    } catch (error) {
      let errorMessage = 'An error occurred while translating';
      if (error.code === 'NOT_SUPPORTED') {
        errorMessage = 'The language is not supported';
      }
      await coax.reply(errorMessage);
    }
  },
};
