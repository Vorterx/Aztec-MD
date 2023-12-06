const fg = require('api-dylux');
const fs = require('fs');
const { MessageMedia } = require('whatsapp-web.js');

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
        
        const media = new MessageMedia(
          'video/mp4', 
          fs.createReadStream(filePath)
        );

        await vorterx.sendMessage(m.from, media, { quoted: m });
      }
    } catch (error) {
      console.error(error);
      await connect('❌');
      return m.reply(`Failed to download and send the videos. Error: ${error.message}`);
    }
  },
};
