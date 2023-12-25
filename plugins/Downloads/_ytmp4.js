const fs = require('fs');
const config = require('../../config.js');
const { tiny } = require('@viper-x/fancytext');
const fetch = async (url) => import('node-fetch').then(module => module.default(url));
const path = require('path');

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

    // Generate a random name for the video file
    const randomFileName = `temp_video_${Math.floor(Math.random() * 1000000)}.mp4`;
    const tempFilePath = path.join(__dirname, 'tmp', randomFileName);

    // Save the video directly in the 'tmp' folder without explicitly creating it
    const videoStream = await fetch(downloadUrl);
    const videoBuffer = await videoStream.buffer();
    fs.writeFileSync(tempFilePath, videoBuffer);

    // Send the video
    await vorterx.sendMessage(m.from, { video: tempFilePath, caption });

    // Delete the temporary video file after sending
    fs.unlinkSync(tempFilePath);
  }
};
