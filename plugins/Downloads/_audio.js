const yts = require('yt-search');
const ytdl = require('ytdl-core');
const fs = require('fs');
const path = require('path');

module.exports = {
  name: 'song',
  alias: ['audio'],
  category: 'Downloads',
  async client(vorterx, m, { args, connect }) {
    if (!args) {
      await connect('❌');
      return m.reply('Please provide a song name...');
    }

    try {
      await connect('✔️');
      m.reply('🔄 Searching for the song...');

      const searchResults = await yts(args);
      const firstResult = searchResults.videos[0];

      if (!firstResult) {
        await connect('❌');
        return m.reply('No results found for the given song name.');
      }

      const videoURL = firstResult.url;
      const videoInfo = await ytdl.getInfo(videoURL);

      const fileName = `${videoInfo.videoDetails.title}.mp3`;
      const filePath = path.join(__dirname, 'downloads', fileName);

      if (fs.existsSync(filePath)) {
        await vorterx.sendMessage(m.from, { audio: filePath }, { quoted: m });
      } else {
        const audioStream = ytdl(videoURL, { quality: 'highestaudio' });

        audioStream.pipe(fs.createWriteStream(filePath));

        audioStream.on('end', async () => {
          await vorterx.sendMessage(m.from, { audio: filePath }, { quoted: m });
        });
      }
    } catch (error) {
      console.error('Error in song download:', error);
      await connect('❌');
      return m.reply('An error occurred while fetching the song.');
    }
  }
};
      
