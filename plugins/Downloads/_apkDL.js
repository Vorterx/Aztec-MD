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

      const appDetails = results[0];

      const { name, size, package: packageId, lastup } = appDetails;

      const getSize = size > 907 ? 'This app is too large to download...' : '';

      let gotApp = `*『 APPLICATION DOWNLOADER 』*\n\n`;
      gotApp += `*🛡️ App Name*: *${name}*\n`;
      gotApp += `*📤 Size*: *${size}\n*`;
      gotApp += `*📦 App Id*: *${packageId}*\n`;
      gotApp += `*⬆️ Updated*: *${lastup}*\n`;

      if (getSize) {
        await connect('❌');
        return m.reply(getSize);
      }

      await connect('📤');
      const getApp = await download(results[0]);
      const { dllink } = getApp;
await vorterx.sendMessage(
  m.from,
  {
    caption: tiny(gotApp),
    document: {
      url: dllink,
      mimetype: 'application/vnd.android.package-archive',
      filename: `${name}.apk`
    }
  },
  'document'
);
    } catch (error) {
      console.error('Error:', error);
      await connect('❌');
      return m.reply('An unexpected error occurred, sorry...');
    }
  },
};
