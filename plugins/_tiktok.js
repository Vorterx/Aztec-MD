//
const fg = require('api-dylux');

module.exports = {
  name: 'tik',
  alias: ['tiktok'],
  category: 'Downloads',
  description: 'To download TikTok videos',
  async client(vorterx, m, { args, text, connect }) {
    if (!args[0]) {
      await connect('❌');
      return m.reply('Please provide a video link');
    }

    const url = args[0];

    try {
      const result = await fg.tiktok(url);

      if (result.success) {
        await connect('✅');

        await vorterx.sendMessage(m.from, {
          video: {
            url: result.videoUrl,
            mimetype: 'video/mp4',
            filename: 'tiktok_video.mp4',
          },
        });
      } else {
        await connect('❌');
        return m.reply('Failed to download the TikTok video.');
      }
    } catch (error) {
      console.error('Error:', error);
      await connect('❌');
      return m.reply('An error occurred while downloading the TikTok video.');
    }
  },
};
