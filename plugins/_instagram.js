const { instagramdlv2, instagramdlv3 } = require('@bochilteam/scraper');

module.exports = {
  name: 'insta',
  alias: ['ig'],
  category: 'Downloads',
  async client(vorterx, m, { args, connect }) {
  
    if (!args[0]) {
      await connect('❌');
      return m.reply('Please provide a valid Instagram URL.');
    }

    try {
      let mediaUrl, caption;
      const videoData = await bocil.instagramdlv2(args[0]);

      if (videoData) {
        mediaUrl = videoData[0]?.url;
      } else {
        const videoDataV3 = await bocil.instagramdlv3(args[0]);
        mediaUrl = videoDataV3.url;
        caption = videoDataV3.title;
      }

      if (!mediaUrl) {
        return m.reply('Failed to download the video.');
      }

      m.reply('Downloading your video please wait...⏳');
      vorterx.sendMessage(m.from, { video: { url: mediaUrl }, caption }, { quoted: m });
    } catch (error) {
      console.error(error);
      return m.reply('Failed to download the video.');
    }
  },
};
