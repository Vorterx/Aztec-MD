const axios = require('axios');

module.exports = {
  mame: 'fb',
  description: 'To download Facebook video',
  category: 'Downloads',
  async xstart(vorterx,m,{text, xReact, args}) {

  if (!text) {
    await xReact('❌');
    return m.reply('Please provide a Facebook video URL');
  }
  try {
    await xReact('📤');
    m.reply(`\`\`\`Downloading your video, please wait...⏳\`\`\``);
    let res = await axios.get(`https://api.botcahx.live/api/dowloader/fbdown3?url=${text}&apikey=29y8XIYL`);
    const oUrl = res.data.url;
    const txt = `[*FB DOWNLOAD*]\n` +
      `😀 Title: ${res.data.title}\n` +
      `😀 Quality: ${res.data.selectedNumber === '1' ? '720p (HD)' : '360p (SD)'}\n` +
      `🙂 Views: ${res.data.views}\n\n` +
      `└───────────◉`;
    const mSg = { video: { url: oUrl }, caption: txt };
    vorterx.sendMessage(m.from, mSg);
  } catch (error) {
    console.error('Error downloading Facebook video:', error);
    m.reply('An error occurred while processing the video');
  }
}}
