const config = require('../config.js');
const fetch = async (url) => import('node-fetch').then(module => module.default(url));

module.exports = {
  name: 'ytmp4',
  category: 'Downloads',
  async client(vorterx, m, { text, args, connect }) {
  
    if (!args[0]) {
      await connect('❌');
      return m.reply('Please provide a YouTube link for me to download');
    }

    const v_api = `https://vihangayt.me/download/ytmp4?url=${encodeURIComponent(args[0])}`;
    const res = await fetch(v_api);
    const vid = await res.json();

    await connect('📤')
    const v_qualty = ['vid_360p', 'vid_720p']; 
    let videoURL = '';
    let i = 0;
    while (i < v_qualty.length && !videoURL) {
      const quality = v_qualty[i];
      if (vid.data[quality]) {
        videoURL = vid.data[quality];
      }
      i++;
    }    
    await vorterx.sendMessage(m.from, { video: videoURL, caption: `*Title*: ${vid.data.title}\n*Quality*: ${v_qualty[i - 1]}\n\n*${config.CAPTION}*` });    
  }
};
