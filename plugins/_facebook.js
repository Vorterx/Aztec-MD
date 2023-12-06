const fg = require('api-dylux');
const fs = require('fs');

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
        const filePath = res.toString(); // Convert res to a string representing the file path
        const stream = fs.createReadStream(filePath); // Create a read stream from the file path
        await vorterx.sendMessage(m.from, { video: { url: stream }, quoted: m }); // Pass the stream as the URL
      }
    } catch (error) {
      console.error(error);
      await connect('❌');
      return m.reply(`Failed to download and send the videos. Error: ${error.message}`);
    }
  },
};
