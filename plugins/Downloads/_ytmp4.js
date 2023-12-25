const fetch = async (url) => import('node-fetch').then(module => module.default(url));

module.exports = {
  name: 'ytmp4',
  alias: ['vid', 'mp4'],
  category: 'Downloads',
  async client(vorterx, m, { args, connect }) {
    if (!args) {
      await connect('❌');
      return m.reply('Please provide a YouTube link for me to download');
    }

    const getMP4 = `https://vihangayt.me/download/ytmp4?url=${encodeURIComponent(args)}`;
    const response = await fetch(getMP4);

    if (response.ok) {
      const videoBuffer = await response.buffer();
      await connect('✅');
     await vorterx.sendMessage(m.from, videoBuffer, 'video', { caption: 'Downloaded video' });
    } else {
      await connect('❌');
      return m.reply('Failed to download the video. Please check the URL and try again.');
    }
  },
};
      
