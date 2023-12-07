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
    const result = await fg.tiktok(url);

    if (result.success) {
      await connect('✅');
      const { title, quality, download } = result;
      const msg = `Title: ${title}\nQuality: ${quality}`;

      await vorterx.sendMessage(m.from, {
        video: {
          url: download,
          mimetype: 'video/mp4',
          filename: 'tiktok_video.mp4',
        },
        caption: msg,
      });
    } else {
      await connect('❌');
      m.reply('Failed to download the TikTok video.');
    }
  },
};
