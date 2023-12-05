const config = require('../config.js');
const { getJson } = require('../lib/client.js');

module.exports = {
  name: 'apk',
  alias: ['app', 'getpack'],
  description: 'Download applications from Aptoid',
  category: 'Downloads',
  async client(vorterx, m, { text, args, connect, quoted }) {
    if (!text) {
      await connect('❌');
      return m.reply('*Please provide the name of the application.*');
    }

    try {
      const searchResult = await getJson(`${config.BASE_URL}api/apk/search?query=${encodeURIComponent(text)}`);
      if (!searchResult.status || !searchResult.result || searchResult.result.length === 0) {
        await connect('❌');
        return m.reply('*No results found for the application you searched.*');
      }

      const app = searchResult.result[0];
      const downloadResult = await getJson(`${config.BASE_URL}api/apk/download?query=${encodeURIComponent(app.name)}`);
      if (!downloadResult.status || !downloadResult.result) {
        await connect('❌');
        return m.reply('*Error occurred while downloading the application.*');
      }

      await connect('📤');
      m.reply(`*Downloading ${app.name}...*`);

      await vorterx.sendMessage(m.from, {
        document: {
          url: downloadResult.result.link,
          caption: `*Downloading ${app.name}*\n\n*Developer*: ${downloadResult.result.dev}`,
          fileName: app.name + '.apk',
        },
        quoted: m,
      });

    } catch (error) {
      console.error(error);
      await connect('❌');
      return m.reply(`*Error occurred while processing your request.*\n\n${error.message}`);
    }
  },
};
