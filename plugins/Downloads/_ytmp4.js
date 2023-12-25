const config = require('../../config.js');
const { tiny } = require('@viper-x/fancytext');
const fetch = async (url) => import('node-fetch').then(module => module.default(url));

module.exports = {
  name: 'ytmp4',
  alias: ['vid', 'mp4'],
  category: 'Downloads',
  async client(vorterx, m, { text, args, connect }) {

    if (!args[0]) {
      await connect('❌');
      return m.reply('Please provide a YouTube link for me to download');
    }

    const v_api = 'https://videodl.onrender.com/downloadurl?link=' + encodeURIComponent(args[0]);
    const res = await fetch(v_api);

    if (!res.ok) {
      await connect('❌');
      return m.reply(`\`\`\`Error while downloading the video...\`\`\``);
    }

    const videoInfo = await res.json();

    await connect('📤');
    m.reply(`\`\`\`Downloading your video, please wait...⏳\`\`\``);

    const { title, downloadUrl, uploadDate, uploadChannel, duration, thumbnail, likes, dislikes } = videoInfo;

    const caption = tiny(`*Title*: ${title}\n*Upload Date*: ${uploadDate}\n*Channel*: ${uploadChannel}\n*Duration*: ${duration}\n*Likes*: ${likes}\n*Dislikes*: ${dislikes}\n*${config.CAPTION}*`);

    await vorterx.sendMessage(m.from, { video: downloadUrl, caption });
  }
};
