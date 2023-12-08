const ytdl = require('ytdl-core-discord');
const search = require('yt-search');

module.exports = {
  name: 'song',
  description: 'To Download music',
  async client(vorterx, m, { text, args, mime, connect }) {
    if (!args[0]) {
      await connect('❌');
      return vorterx.sendMessage(m.from, { text: 'Please provide a song name' }, { quoted: m });
    }

    try {
      await connect('🎵');

      // Use yt-search to search for the song
      const songName = args.join(' ');
      const { videos } = await search(songName);

      // Check if any videos were found
      if (videos.length > 0) {

        // Use ytdl-core-discord to download the first video as audio
        const firstVideo = videos[0];
        const audioStream = await ytdl(firstVideo.url, { filter: 'audioonly' });

        await connect('✅');
        vorterx.sendMessage(m.from, { audio: audioStream }, { mimetype: 'audio/mp3', quoted: m });
      } else {
        await connect('❌');
        vorterx.sendMessage(m.from, { text: 'No videos found for the given song' }, { quoted: m });
      }
    } catch (error) {
      await connect('❌');
      vorterx.sendMessage(m.from, { text: `An error occurred: ${error.message}` }, { quoted: m });
    }
  },
};
