const axios = require('axios');

module.exports = {
  name: 'tik',
  alias: ['tiktok'],
  description: 'To download tiktok videos',
  category: 'Downloads',
  async client(vorterx, m, { text, args, connect }) {
    
    if (!text) {
      await connect('❌');
      return m.reply('Please provide a valid TikTok video URL.');
    }
    const apiKey = '29y8XIYL';
    let caption = '';
    try {
      const adUrl = `https://api.botcahx.live/api/dowloader/tiktok?url=${encodeURIComponent(
        text
      )}&apikey=${apiKey}`;
      await connect('📤');
      m.reply(`\`\`\`Downloading your video, please wait...⏳\`\`\``);
      const res = await axios.get(adUrl);
      const data = res.data;
      if (data.success) {
        const Title = data.result.title;
        const Views = data.result.views;
        const Likes = data.result.likes;
        const Published = data.result.published;
        caption = `🌳TITLE: ${Title}\n👀VIEWS: ${Views}\n👍LIKES: ${Likes}\n🙌PUBLISHED: ${Published}`;
        vorterx.sendMessage(m.from, `${caption}`);
      } else {}
    } catch (error) {
      console.error('An error occurred:', error);
      m.reply('An error occurred while processing the TikTok video');
    }
  }
};
