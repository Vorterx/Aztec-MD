const fg = require('api-dylux');
const urlRegex = /^(?:https?:\/\/)?(?:www\.)?(?:facebook\.com|fb\.watch)\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i;

module.exports = {
  name: 'fb',
  description: 'To download Facebook video',
  category: 'Downloads',
  async client(vorterx, m, { text, connect, args }) {
    if (!text || !urlRegex.test(text)) {
      await connect('❌');
      return m.reply('Please provide a valid Facebook video URL');
    }

    try {
      await connect('📤');
      m.reply('Downloading your video, please wait...⏳');
      const res = await fg.fbdl(text);
      const oUrl = res.url ? res.url.toString() : null;
      const txt = `[*FB DOWNLOAD*]\n` +
        `😀 Title: ${res.title}\n` +
        `😀 Quality: ${res.selectedNumber === '1' ? '720p (HD)' : '360p (SD)'}\n` +
        `🙂 Views: ${res.views}\n\n` +
        `└───────────◉`;
      const mSg = { video: { url: oUrl }, caption: txt };
      await vorterx.sendMessage(m.from, mSg);
    } catch (error) {
      console.error('Error downloading Facebook video:', error);
      m.reply('An error occurred while processing the video');
    }
  }
};
