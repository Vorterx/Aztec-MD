const { search, download } = require('aptoide-scraper');
const { tiny } = require('@viper-x/fancytext');

module.exports = {
  name: 'getpack',
  alias: ['apk', 'app'],
  category: 'Downloads',
  async client(vorterx, m, { args, connect }) {
    if (!args) {
      await connect('❌');
      return m.reply('Please provide an app name, e.g., apk Acode Editor...');
    }

    try {
      const results = await search(args);

      if (!results.length) {
        return m.reply('No results found for the given app name.');
      }

      const { icon, name, size, package, lastup } = results[0];

      if (size > 907) {
        await connect('❌');
        return m.reply('This app is too large to download...');
      }

      await connect('📤');
      const getApp = await download(results[0]);
      const { dllink } = getApp;

      const gotApp = `*『 APPLICATION DOWNLOADER 』*\n\n` +
        `*🛡️ App Name*: *${name}*\n` +
        `*📤 Size*: *${size}\n*` +
        `*📦 App Id*: *${package}*\n` +
        `*⬆️ Updated*: *${lastup}*\n`;

      vorterx.sendMessage(m.from, {
        image: { url: icon },
        caption: tiny(gotApp),
        document: { url: dllink, mimetype: 'application/vnd.android.package-archive', fileName: `${name}.apk` }
      });
    } catch (error) {
      console.error('Error:', error);
      await connect('❌');
      return m.reply('An unexpected error occurred, sorry...');
    }
  },
};
