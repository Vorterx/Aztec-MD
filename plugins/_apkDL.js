module.exports = {
  name: 'getpack',
  alias: ['apk', 'app'],
  category: 'Downloads',
  async client(vorterx, m, { text, connect }) {
    try {
      const { download } = require('aptoide-scraper');

      if (!text) {
        await connect('❌');
        return m.reply('Please specify an app name.');
      }

      const data = await download(text);

      if (!data) {
        await connect('❌');
        return m.reply('App not found. Please check the name and try again.');
      }

      const caption = `*App Name*: ${data.name}\n*Developer*: ${data.developer}`;

      await vorterx.sendMessage(
        m.from,
        {
          thumbnail: { url: data.icon },
          document: {
            url: data.dllink,
            mimetype: 'application/octet-stream',
            fileName: data.name + '.apk',
            caption: caption,
          },
          quoted: m,
        }
      );
    } catch (error) {
      console.error(error);
      m.reply('An error occurred while processing your request.');
    }
  },
};
  
