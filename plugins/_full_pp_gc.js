const ytdl = require('sigma-md-ytdl');

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
      const videoInfo = await ytdl.getInfo(args.join(' '));
      const audioFormat = ytdl.chooseFormat(videoInfo.formats, { quality: 'highestaudio' });

      
      const songBuffer = await ytdl.downloadFromInfo(videoInfo, audioFormat);

      await connect('✅');
      vorterx.sendMessage(m.from, { audio: songBuffer }, { mimetype: 'audio/mp3', quoted: m });
    } catch (error) {
      await connect('❌');
      vorterx.sendMessage(m.from, { text: `An error occurred: ${error.message}` }, { quoted: m });
    }
  },
};
