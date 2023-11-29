module.exports = {
  name: 'movie',
  alias: ['imdb'],
  category: 'Search',
  description: 'To get movie info',
  async xstart(vorterx, m, { text, args }) {
        
    const { default: fetch } = await import('node-fetch');
    
    if (!text) {
      await xReact('❌');
      return m.reply('Provide a movie name e.g. movie Dragon ball');
    }

    await xReact('🎬');
    const apiKey = 'bv1SpA';
    const apiUrl = `https://api.neoxr.eu/api/film?q=${text}&apikey=${apiKey}`;    
    const response = await fetch(apiUrl);
    const data = await response.json();
    
    if (data && data.length > 0) {      
      const movieInfo = data.map((movie) => {
        const title = movie.title;
        const year = movie.year;
        const rated = movie.rated;
        const released = movie.released;
        const director = movie.director;
        const writer = movie.writer;
        const actors = movie.actors;
        const plot = movie.plot;
        const language = movie.language;
        const country = movie.country;
        const awards = movie.awards;
        const boxOffice = movie.boxOffice;
        const production = movie.production;
        const rating = movie.rating;
        const imageUrl = movie.imageUrl;
        const movies_Cap = `
*🎬Title* : ${title}\n
*📅Year* : ${year}\n
*⭐Rated* : ${rated}\n
*📆Released* : ${released}\n
*👨🏻‍💻Director* : ${director}\n
*✍Writer* : ${writer}\n
*👨Actors* : ${actors}\n
*📃Plot* : ${plot}\n
*🌐Language* : ${language}\n
*🌍Country* : ${country}\n
*🎖️Awards* : ${awards}\n
*📦BoxOffice* : ${boxOffice}\n
*🏙️Production* : ${production}\n
*🌟Rating* : ${rating}\n`;

        return { movies_Cap, imageUrl };
      });
   
      for (const { movies_Cap, imageUrl } of movieInfo) {
        await vorterx.sendMessage(m.from, { image: { url: imageUrl }, caption: `Movie Information:\n\n${movies_Cap}` }, { quoted: m });
      }
    } else {
      await m.reply('_No movie information found sorry_');
    }
  },
};
