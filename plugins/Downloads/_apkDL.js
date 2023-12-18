const { search, download } = require('aptoide-scraper');

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

      if (!results.ok) {
        return m.reply('An error occurred, sorry');
      }

      const { icon, name, size, package: appId, lastup: updated } = results;

      const getSize = size > 907 ? 'This app is too large to download...' : '';

      let gotApp = `*APPLICATION DOWNLOADER*\n\n`;
      gotApp += `*🛡️ App NaMe*: *${name}*\n`;
      gotApp += `*📤 Size*: *${size}\n*`;
      gotApp += `*📦 App Id*: *${appId}*\n`;
      gotApp += `*⬆️ Updated*: *${updated}*\n`;

      if (getSize) {
        await connect('❌');
         return m.reply(getSize);
      }

      await connect('📤');
      const getApp = await download(results);
      const { dllink } = getApp;

      vorterx.sendMessage(m.from, {
        image: { url: icon }, caption: tiny(gotApp),
        document: { url: dllink, mimetype: 'application/vnd.android.package-archive', fileName: `${name}.apk` }
      });
    } catch (error) {
      console.error('Error:', error);
      return m.reply('An unexpected error occurred sorry...');
    }
  },
};  
