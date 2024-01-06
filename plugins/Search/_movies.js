const axios = require('axios');
const { Zenith } = require('../../lib/_cmd_sxntax.js');

Zenith (
  {
  usage: 'movie',
  alias: ['imdb'],
  category: 'Search',
  desc: 'Get movie info',
  filename: __filename
  }, async (vorterx,m, react, { args}) => {
    
    try {
      if (!args) {
        await react('❌');
        return m.reply(`Please provide a movie name, e.g., "Dragon Ball".`);
      }
      await react('🔍');
      const movieInfo = await axios.get(`http://www.omdbapi.com/?apikey=742b2d09&t=${args}&plot=full`);

      if (!movieInfo.data || movieInfo.data.Response === 'False') {
        await react('❌');
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

      const movieDetails = `*MOVIE SEARCH INFORMATION*\n\n
*🎬Title*: ${Title}
*📅Year*: ${Year}
*⭐Rated*: ${Rated}
*📆Released*: ${Released}
*⏳Runtime*: ${Runtime}
*🌀Genre*: ${Genre}
*👨🏻‍💻Director*: ${Director}
*✍Writer*: ${Writer}
*👨Actors*: ${Actors}
*📃Plot*: ${Plot}
*🌐Language*: ${Language}
*🌍Country*: ${Country}
*🎖️Awards*: ${Awards}
*📦BoxOffice*: ${BoxOffice}
*🏙️Production*: ${Production}
*🌟imdbRating*: ${imdbRating}
*✅imdbVotes*: ${imdbVotes}`;

await vorterx.sendMessage(m.chat, { image: { url: Poster }, caption: movieDetails }, { quoted: m });
    } catch (error) {
      console.error(error);
      await react('❌');
      return m.reply(`❌ An error occurred while processing the request...`);
    }
  });
