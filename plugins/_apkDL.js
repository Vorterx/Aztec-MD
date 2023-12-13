const { download } = require('aptoide-scraper');

module.exports = {
  name: 'getpack',
  alias: ['apk', 'app'],
  category: 'Downloads',
  async client(vorterx, m, { text, connect }) {
    try {
      if (!text) {
        await connect('❌');
        return m.reply('Please specify an app name.');
      }

      const data = await download(text);

      if (!data) {
        await connect('❌');
        return m.reply('App not found. Please check the name and try again.');
      }

      const inf = `*App Name*: ${data.name}\n*Developer*: ${data.developer}`;

      const buttonMessage = {
        document: await download(text, { buffer: true }), 
        mimetype: 'application/vnd.android.package-archive',
        fileName: data.name + '.apk',
        caption: inf,
      };

      await vorterx.sendMessage(m.from, buttonMessage, { quoted: m });
    } catch (error) {
      console.error(error);
      m.reply('An error occurred while processing your request.');
    }
  },
};
