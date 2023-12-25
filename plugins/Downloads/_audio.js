const yts = require('yt-search');
const ytdl = require('ytdl-core');

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
      const audioStream = ytdl(videoURL, { quality: 'highestaudio' });

       vorterx.sendMessage(m.from, { audio: audioStream }, { quoted: m });

    } catch (error) {
      console.error('Error in song download:', error);
      
      return m.reply('An error occurred while fetching the song.');
    }
  }
};
    
