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

    const mp4 = `https://vihangayt.me/download/ytmp4?url=${encodeURIComponent(args)}`;
    const response = await fetch(mp4);

    if (response.ok) {
      const data = await response.json();

      console.log(data);

      if (data.data && data.data.vid_720p) {
        await connect('✅');
   await vorterx.sendMessage(m.from, { video: data.data.vid_720p }, { caption: '*Downloaded video*' });
      } else {
        await connect('❌');
        return m.reply('720p video data not found in the API response.');
      }
    } else {
      await connect('❌');
      return m.reply('Failed to download the video. Please check the URL and try again.');
    }
  },
};
