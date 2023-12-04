const ytdl = require('sigma-md-ytdl');
const prefix = process.env.PREFIX;

module.exports = {
  name: 'song',
  alias: ['audio'],
  description: 'To download any music you desire',
  async client(vorterx, m, { text, mime, connect }) {
   
    if (!text) {
      await connect('❌');
      return m.reply(`Please provide a song name (e.g., ${prefix}song "Dubula by Emoh x Hurry cane")`);
    }
    try {
      m.reply(`\`\`\`Downloading your song, please wait...⏳\`\`\``);      
      const yts = await ytdl.getVideoInfo(text);
      const audio = ytdl.filterFormats(yts.formats, 'audioonly');
      if (audio.length === 0) {
        await connect('❌');
        return m.reply("Sorry, I couldn't find any audio formats for the provided song.");
      }

      const { title, thumbnail, url } = yts.videoDetails;
      const audi0 = audio[0];
      const getanu = {
        quality: audi0.qualityLabel || audi0.audioQuality,
      };
       
      const waveMP3 = await ytdl.downloadFromInfo(yts, getanu);
      const bufferMP3 = waveMP3.bufferMP3;
      const getFileName = `${title}.mp3`;
      const results = Buffer.from(bufferMP3);
      const music_get = {
        document: results,
        mimetype: 'audio/mpeg',
        filename: getFileName,
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
