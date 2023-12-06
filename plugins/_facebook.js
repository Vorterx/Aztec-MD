const dylux = require('api-dylux');

module.exports = {
  name: 'fb',
  category: 'Downloads',
  async client(vorterx, m, { text, args, quoted, connect }) {
    const url = args[0];
    const urlPattern = /^https?:\/\/(?:www\.)?fb\.watch\/\?v=.+/i;
    if (!url || !urlPattern.test(url)) {
      return m.reply('Please provide a valid Facebook video URL starting with "fb.watch".');
    }

    try {
      const downloadUrl = await dylux.fbvideo(url);
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
