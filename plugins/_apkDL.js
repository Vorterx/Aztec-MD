const axios = require('axios');

module.exports = {
  name: 'apk',
  category: 'Downloads',
  description: 'Download and send any APK you desire',
  async client(vorterx, m, { args }) {
    
    if (!args[0]) {
      return m.reply('Please provide an app ID to download.');
    }
    try {
      const apps = `https://vihangayt.me/download/apk?id=${args[0]}`;
      const res = await axios.get(apps, { responseType: 'arraybuffer' });
      const apkBuffer = res.data;
      vorterx.sendMessage(m.from, apkBuffer, { sendMediaAsDocument: true, mimetype: 'application/vnd.android.package-archive', filename: `${args[0]}.apk` })
        .catch((error) => {
          console.error(error);
          m.reply('Failed to send APK.');
        });
    } catch (error) {
      console.error(error);
      m.reply('Failed to download APK.');
    }
  },
};
