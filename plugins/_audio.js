const ytdl = require('sigma-md-ytdl');

module.exports = {
  name: 'song',
  alias: ['audio'],
  description: 'To download any music you desire',
  async xstart(vorterx, m, { text, mime, xReact }) {
   
    if (!text) {
      await xReact('❌');
      return m.reply(`Please provide a song name (e.g., ${prefix}song "Dubula by Emoh x Hurry cane")`);
    }
    try {
      const yts = await ytdl.getVideoInfo(text);
      const audio = ytdl.filterFormats(yts.formats, 'audioonly');
      if (audio.length === 0) {
        await xReact('❌');
        return m.reply("Sorry, I couldn't find any audio formats for the provided song.");
      }

      const { title, thumbnail, url } = yts.videoDetails;
      const audio = audio[0];
      const getanu = {
        quality: audio.qualityLabel || audio.audioQuality,
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
      await xReact('✅');
    } catch (error) {
      console.error('Error downloading the song:', error);
      await xReact('❌');
      return m.reply('An error occurred while downloading the song. Please try again later.');
    }
  },
};
