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

        const result = await ttdl(args);
      console.log(result)

      if (result && result.url) {
         const caption = `
╭──*『 TIKTOK DOWNLOAD 』*
│ *Video Link:* ${result.url}
╰───────────────────༓`;

        await vorterx.sendMessage(m.from, {
          document: { url: result.url, mimetype: 'video/mp4' },
          caption,
        });
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
    
