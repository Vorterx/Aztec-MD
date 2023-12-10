const axios = require('axios');

module.exports = {
  name: 'movie',
  alias: ['imdb'],
  category: 'Search',
  description: 'Get movie info',
  async client(vorterx, m, { text, args, connect }) {
    
    try {
      if (!text) {
        await connect('❌');
        return m.reply(`Please provide a movie name, e.g., "Dragon Ball".`);
      }

      await connect('🔍');
      const movieInfo = await axios.get(`http://www.omdbapi.com/?apikey=742b2d09&t=${text}&plot=full`);

      if (!movieInfo.data || movieInfo.data.Response === 'False') {
        await connect('❌');
        return m.reply(`Sorry, couldn't retrieve data for the provided movie name.`);
      }

      const {
        Title,
        Year,
        Rated,
        Released,
        Runtime,
        Genre,
        Director,
        Writer,
        Actors,
        Plot,
        Language,
        Country,
        Awards,
        BoxOffice,
        Production,
        imdbRating,
        imdbVotes,
        Poster,
      } = movieInfo.data;

      const movieDetails = `**MOVIE SEARCH INFORMATION**\n\n
🎬 **Title:** ${Title}
📅 **Year:** ${Year}
⭐ **Rated:** ${Rated}
📆 **Released:** ${Released}
⏳ **Runtime:** ${Runtime}
🌀 **Genre:** ${Genre}
👨🏻‍💻 **Director:** ${Director}
✍ **Writer:** ${Writer}
👨 **Actors:** ${Actors}
📃 **Plot:** ${Plot}
🌐 **Language:** ${Language}
🌍 **Country:** ${Country}
🎖️ **Awards:** ${Awards}
📦 **BoxOffice:** ${BoxOffice}
🏙️ **Production:** ${Production}
🌟 **imdbRating:** ${imdbRating}
✅ **imdbVotes:** ${imdbVotes}`;

  await vorterx.sendMessage(m.from, { image: { url: Poster }, caption: movieDetails }, { quoted: m });
    } catch (error) {
      console.error(error);
      await connect('❌');
      return m.reply(`❌ An error occurred while processing the request.`);
    }
  },
};
