const axios = require('axios');
const { Zenith } = require('../../lib/functions');
const config = require('../../config');

Zenith(
  {
    usage: 'fetch',
    desc: 'To fetch any website start with https',
    category: 'Owner',
  },
  async (vorterx, m, react, { args,isDev }) => {
  
    if (!args || isDev) {
      await react('❌');
      return m.reply('*_This feature is 4 my Dev_*');
    } else if (!args.startsWith('https://')) {
      return m.reply('*_Please provide a website starting with https://_*');
    }

    const isDiego = args;
    axios.get(isDiego, { responseType: 'arraybuffer' })
      .then((response) => {
        const to_IMG = Buffer.from(response.data, 'binary');
        await react('✳️');

        vorterx.sendMessage(
          m.chat,
          { image: { url: `data:image/png;base64,${to_IMG.toString('base64')}` }, caption: `${config.CAPTION}` },
          { quoted: m }
        );
      })
      .catch((error) => {
        console.error(error);
        m.reply('*_E3RR IS GAY_*');
      });
  }
);
