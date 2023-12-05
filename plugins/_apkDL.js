const config = require('../config.js');
const { getJson } = require('../lib/client.js');

module.exports = {
  name: 'apk',
  alias: ['app', 'getpack'],
  description: 'To download apk',
  category: 'Downloads',
  async client(vorterx, m, { text, args, connect, quoted }) {
    if (!text) {
      await connect('❌');
      return m.reply('*Please provide the name of the app you want to download.*');
    }
    try {
      const data = await getJson(`${config.api_down}api/apk/download?query=${encodeURIComponent(text)}`);
      if (!data || data.length === 0) {
        await connect('❌');
        return m.reply('*No results found for the app you searched.*');
      }

      m.reply('```\nDownloading your app, please wait...\n```');
      await connect('📤');

      const app = data[0];
      const caption = `*〄 APKDL DOWNLOADR 〄*\n\n*📚 App Name*: ${app.title}\n*📦 Developer*: ${app.developer}\n*⬆️ Last update*: ${app.lastUpdate}\n*📥 Size*: ${app.size}\n*🤖 Bot Name*: INRL-OFFICIAL\n\n\n*_BY WhatsApp CHATBOT_*`;

      await vorterx.sendMessage(m.from, {
        document: {
          url: app.link,
          caption,
          fileName: `${app.name}.apk`,
        },
        quoted: m,
      });
    } catch (error) {
      console.error(error);
      await connect('❌');
      return m.reply('_Error occurred while downloading the app._');
    }
  },
};
