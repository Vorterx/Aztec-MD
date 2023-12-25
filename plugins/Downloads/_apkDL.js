const { search, download } = require('aptoide-scraper');
const { tiny } = require('@viper-x/fancytext');

module.exports = {
  name: 'getpack',
  alias: ['apk', 'app'],
  category: 'Downloads',
  async client(vorterx, m, { args, connect }) {
    if (!args[0]) {
      await connect('❌');
      return m.reply('Please provide an app name e.g apk Acode Editor...');
    }

    try {
      const results = await search(args[0]);

      if (!results || !results.list || results.list.length === 0) {
        await connect('❌');
        return m.reply('No results found for the provided app name.');
      }

      const { icon, name, size, package: appId, lastup: updated } = results.list[0];

      const getSize = size > 907 ? 'This app is too large to download...' : '';

      if (getSize) {
        await connect('❌');
        return m.reply(getSize);
      }

      await connect('📤');
      const getApp = await download(results.list[0]);
      const { dllink } = getApp;

      const formattedInfo = `*『 APPLICATION DOWNLOADER 』*\n\n`
        + `*🛡️ App NaMe*: *${name}*\n`
        + `*📤 Size*: *${size}\n*`
        + `*📦 App Id*: *${appId}*\n`
        + `*⬆️ Updated*: *${updated}*\n`;

      vorterx.sendMessage(m.from, {
        document: { url: dllink, fileName: `${name}.apk`, mimetype: 'application/vnd.android.package-archive' },
        text: tiny(formattedInfo),
      });

    } catch (error) {
      console.error('Error:', error);
      await connect('❌');
      return m.reply('An unexpected error occurred, sorry...');
    }
  },
};
          
