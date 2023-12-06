//
const dylux = require('api-dylux');

module.exports = {
  name: 'fb',
  category: 'Downloads',
  async client(vorterx, m, { text, args, quoted, connect }) {

    
    if (!text || !text.includes('facebook.com')) {
      return m.reply('Please provide a valid Facebook video URL.');
    }

    try }
      const getVideo = await dylux.fbvideo(text);

      // Send the downloaded video as a video message to the user
      await vorterx.sendMessage(m.from, { video: { url: getVideo } });
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
