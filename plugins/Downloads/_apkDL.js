const { search, download } = require('aptoide-scraper');
const { tiny } = require('@viper-x/fancytext');


module.exports = {
  name: 'getpack',
  alias: ['apk', 'app'],
  category: 'Downloads',
  async client(vorterx, m, { args, connect }) {

    if (!args) {
      await connect('❌');
      return m.reply('Please provide an app name e.g apk Acode Editor...');
    }

    try {
      const results = await search(args);

      if (!results.ok) {
        return m.reply('An error occurred, sorry');
      }

      const { icon, name, size, package, lastup} = results;

      const getSize = size > 907 ? 'This app is too large to download...' : '';

      let gotApp = `*『 APPLICATION DOWNLOADER 』*\n\n`;
      gotApp += `*🛡️ App NaMe*: *${name}*\n`;
      gotApp += `*📤 Size*: *${size}\n*`;
      gotApp += `*📦 App Id*: *${package}*\n`;
      gotApp += `*⬆️ Updated*: *${lastup}*\n`;

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
