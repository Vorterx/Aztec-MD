const { translate } = require('@vitalets/google-translate-api');
const config = require('../../config.js');

module.exports = {
  name: 'tr',
  alias: ['translate','trt'],
  description: 'Translate any usable language',
  category: 'Mics',
  async client(vorterx, m, { text, args, connect }) {
    
    if (!text) {
      await connect('❌');
      return m.reply('Example: tr zu Damn l love this Diegoson eish');
    }

    let lang;
    let data;

    if (text && m.quoted && m.quoted.text) {
      lang = text.slice(0, 2);
      data = m.quoted.text;
    } else if (text) {
      lang = text.slice(0, 2);
      data = text.substring(2).trim();
    }

    try {
      await connect('📝');
      const result = await translate(data, { to: lang });
      const caption = `*📝TEXT*: ${data}\n\n*🧘TRANSLATED*: ${result.text}\n\n*${config.CAPTION}*`;
      await m.reply(caption);
    } catch (error) {
      let errorMessage = 'An error occurred while translating';
      if (error.code === 'NOT_SUPPORTED') {
        errorMessage = 'The language is not supported';
      }
      await m.reply(errorMessage);
    }
  },
};
