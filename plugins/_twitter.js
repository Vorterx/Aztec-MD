const axios = require('axios');

module.exports = {
  name: 'twitter',
  alias: ['tw'],
  category: 'Downloads',
  description: 'Downloads Twitter videos',
  async client(vorterx, m, { args, text, quoted, connect }) {

    if (!args[0]) {
      await connect('❌');
      return m.reply('_⚠️ Please provide a Twitter video URL..._');
    }

    try {
      const getTtvid = await axios.get(`https://api.neoxr.eu/api/twitter?url=${args[0]}&apikey=LOLCff`);
      if (!getTtvid.data || !getTtvid.data.video_url) {
        await connect('❌');
        return m.reply('_❌ Failed to fetch the video from your URL..._');
      }

      m.reply(`\`\`\`Downloading your video, please wait...⏳\`\`\``);
      await connect('📤');
      const Url = getTtvid.data.video_url;
      const title = getTtvid.data.title;
      const getDate = getTtvid.data.published_date;
      const size = getTtvid.data.size;
      const doVideo = await axios.get(Url, {
        responseType: 'arraybuffer',
      });
      if (!doVideo.data) {
        await connect('❌')
        return m.reply('_❌ Failed to download the video._');
      }
      vorterx.sendMessage(m.from, {video: { url: Url, mimetype: 'video/mp4', caption: `📹 **TTITLE:** ${title}\n📅 **PUBLISHED:** ${getDate}\n📏 **SIZE:** ${size}`, file: doVideo.data, }, });
    } catch (error) {
      m.reply('❌ An error occurred while processing the request');
    }
  },
};
