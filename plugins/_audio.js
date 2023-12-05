const axios = require('axios');
const prefix = process.env.PREFIX;

module.exports = {
  name: 'song',
  alias: ['audio'],
  category: 'Downloads',
  description: 'To download any music you desire',
  async client(vorterx, m, { text, mime, connect }) {
    if (!text) {
      await connect('❌');
      return m.reply(`Please provide a song name (e.g., ${prefix}song "Dubula by Emoh x Hurry cane")`);
    }
    try {
      m.reply(`\`\`\`Downloading your song, please wait...⏳\`\`\``);

      const apiUrl = `https://api.botcahx.live/api/downloader/yt?url=${encodeURIComponent(text)}&apikey=29y8XIYL`;
      const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });

      if (response.status !== 200 || !response.data.success) {
        await connect('❌');
        return m.reply("Sorry, an error occurred while downloading the song.");
      }

      const { title, url, thumbnail, filename, mimetype } = response.data.data;

      const music_get = {
        document: {
          data: Buffer.from(response.data.data.buffer, 'base64'),
          mimetype: mimetype,
          filename: filename,
        },
        contextInfo: {
          externalAdReply: {
            showAdAttribution: true,
            mediaType: 2,
            mediaUrl: url,
            title: title,
            body: 'VORTERX DNL',
            sourceUrl: url,
            thumbnail: thumbnail,
            waveform: [100, 0, 0, 0, 0, 0, 100],
            forwardingScore: 999,
            isForwarded: true,
          },
        },
      };

      await vorterx.sendMessage(m.from, music_get, { quoted: m });
      await connect('✅');
    } catch (error) {
      console.error('Error downloading the song:', error);
      await connect('❌');
      return m.reply('An error occurred while downloading the song. Please try again later.');
    }
  },
};
