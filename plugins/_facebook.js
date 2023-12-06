const fg = require('api-dylux');

module.exports = {
  name: 'fb',
  category: 'Downloads',
  async client(vorterx, m, { text, args, quoted, connect }) {
    const url = args[0];

    // Check if the URL matches the required pattern
    const urlPattern = /^https?:\/\/fb\.watch\/\?v=\d+/i;
    if (!url || !urlPattern.test(url)) {
      return m.reply('Please provide a valid Facebook video URL starting with "https://fb.watch".');
    }

    try {
      console.log('URL:', url);
      const downloadUrl = await fg.fbvideo(url);
      console.log('Download URL:', downloadUrl);
      await vorterx.sendMessage(m.from, { video: { url: downloadUrl } });
      // fs.writeFile('video.mp4', downloadedVideo, (err) => {
      //   if (err) console.log(err);
      //   console.log('Video saved successfully.');
      // });
    } catch (error) {
      console.log(error);
      m.reply(`An error occurred while downloading the Facebook video: ${error.message}`);
    }
  }
};
