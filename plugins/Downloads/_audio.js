//
const yts = require('yt-search');
const ytdl = require('ytdl-core');
const fs = require('fs');

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
      m.reply('🔄 Searching for the song...');

      const searchResults = await yts(args);
      const firstResult = searchResults.videos[0];

      if (!firstResult) {
        await connect('❌');
        return m.reply('No results found for the given song name.');
      }

      const videoURL = firstResult.url;
      const videoInfo = await ytdl.getInfo(videoURL);

      const audioStream = ytdl(videoURL, { quality: 'highestaudio' });

      const fileName = `${videoInfo.videoDetails.title}.mp3`;
      const filePath = `./downloads/${fileName}`;

      audioStream.pipe(fs.createWriteStream(filePath));

      audioStream.on('end', () => {
          vorterx.sendMessage(m.from, { audio: filePath }, { quoted: m });
        fs.unlinkSync(filePath); 
        
      });
    } catch (error) {
      console.error('Error in song download:', error);
      
      return m.reply('An error occurred while fetching the song.');
    }
  }
};
    
