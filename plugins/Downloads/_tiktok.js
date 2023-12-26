const { ttdl } = require('btch-downloader');

module.exports = {
  name: 'tiktok',
  alias: ['tik', 'tiktokdl', 'ttdl'],
  description: 'To download TikTok videos',
  async client(vorterx, m, { args, connect }) {
    try {
      if (!args) {
        await connect('❌');
        return m.reply('Provide a valid TikTok video URL...');
      }

      await connect('📥');
      m.reply(`\`\`\`Downloading TikTok video, please wait...⏳\`\`\``);

      // Use the TikTok downloader library
      const result = await ttdl(args);

      if (result && result.video && result.video.length > 0) {
        const videoUrl = result.video[0];

        // You can customize the caption using the retrieved information
        const caption = `
╭──*『 TIKTOK DOWNLOAD 』*
│ *Title:* ${result.title}
│ *Creator:* ${result.creator}
│ *Audio:* ${result.title_audio}
╰───────────────────༓\n\n`;

        await vorterx.sendMessage(m.from, { video: { url: videoUrl }, caption });
      } else {
        await connect('❌');
        return m.reply('Failed to download the TikTok video. Please check the URL.');
      }
    } catch (error) {
      console.error(error);
      await connect('❌');
      return m.reply('An unexpected error occurred while processing the request.');
    }
  }
};
          
