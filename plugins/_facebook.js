//
const fg = require('api-dylux');

module.exports = {
  name: 'fb',
  description: 'Downloads and sends Facebook videos',
  category: ':Downloads',
  async client(vorterx, m, { args, connect }) {
    if (!args.length) {
      await connect('❌');
      return m.reply('Please provide at least one valid URL. I am a glitch bot, nigga.');
    }

    try {
      await connect('✅');
      for (const videoURL of args) {
        const res = await fg.fbdl(videoURL);
        await vorterx.sendMessage(m.from, { video: { url: res }, quoted: m });
      }
    } catch (error) {
      console.error(error);
      await connect('❌');
      return m.reply('Failed to download and send the videos.');
    }
  },
};
