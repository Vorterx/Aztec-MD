const ytdl = require('ytdl-core');
const search = require('yt-search');

module.exports = {
  name: 'song',
  description: 'To Download music',
  async client(vorterx, m, { text, args }) {
    if (!args[0]) {
      return vorterx.sendMessage(m.from, { text: 'Please provide a song name' }, { quoted: m });
    }

    try {
      const songName = args.join(' ');
      const { videos } = await search(songName);

      if (videos.length > 0) {
        const firstVideo = videos[0];
        const audioInfo = await ytdl.getInfo(firstVideo.videoId);
        const audioStream = ytdl.downloadFromInfo(audioInfo, { filter: 'audioonly' });

        vorterx.sendMessage(m.from, { audio: audioStream }, { mimetype: 'audio/mp3', quoted: m });
      } else {
        vorterx.sendMessage(m.from, { text: 'No videos found for the given song' }, { quoted: m });
      }
    } catch (error) {
      vorterx.sendMessage(m.from, { text: `An error occurred: ${error.message}` }, { quoted: m });
    }
  },
};
