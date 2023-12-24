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

      const { icon, name } = appDetails;

      const size = appDetails.size || 'N/A';
      const packageId = appDetails.package || 'N/A';
      const lastUpdated = appDetails.lastup || 'N/A';

      const getSize = size === 'N/A' || size > 907 ? 'This app is too large to download...' : '';

      let gotApp = `*『 APPLICATION DOWNLOADER 』*\n\n`;
      gotApp += `*🛡️ App Name*: *${name}*\n`;
      gotApp += `*📤 Size*: *${size}\n*`;
      gotApp += `*📦 App Id*: *${packageId}*\n`;
      gotApp += `*⬆️ Updated*: *${lastUpdated}*\n`;

      const isCon = icon && icon.startsWith('http');

      if (isCon) {
        vorterx.sendMessage(m.from, {
          image: { url: icon },
          caption: tiny(gotApp),
          document: { url: appDetails.dllink, mimetype: 'application/vnd.android.package-archive', fileName: `${name}.apk` }
        });
      } else {
        vorterx.sendMessage(m.from, {
          caption: tiny(gotApp),
          document: { url: appDetails.dllink, mimetype: 'application/vnd.android.package-archive', fileName: `${name}.apk` }
        });
      }
    } catch (error) {
      console.error('Error:', error);
      await connect('❌');
      return m.reply('An unexpected error occurred, sorry...');
    }
  },
};
          
