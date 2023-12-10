module.exports = {
  name: 'anime',
  category: 'weebs',
  async client(vorterx, m, { args, text, connect }) {
    const axios = require('axios');

    if (!text) {
      return m.reply('Provide an anime name');
    }

    try {
      const res = await axios.get(`https://weeb-api.vercel.app/anime?search=${text}`);
      res.data[0] = {}; // Set the first element of res.data to an empty object

      const data = res.data[0];

      const animeData = {
        status: data.status,
        hashtag: data.hashtag,
        format: data.format,
        isAdult: data.isAdult,
        season: data.season,
        averageScore: data.averageScore,
        popularity: data.popularity,
        source: data.source,
        duration: data.duration,
        episodes: data.episodes,
        genres: data.genres,
        description: data.description,
        thumbnail: data.thumbnail,
        length: res.data.length
      };

      const fg = `Anime: ${text}\nStatus: ${animeData.status}\nHashtag: ${animeData.hashtag}\nFormat: ${animeData.format}\nIs Adult: ${animeData.isAdult}\nSeason: ${animeData.season}\nAverage Score: ${animeData.averageScore}\nPopularity: ${animeData.popularity}\nSource: ${animeData.source}\nDuration: ${animeData.duration}\nEpisodes: ${animeData.episodes}\nGenres: ${animeData.genres}\nDescription: ${animeData.description}\nLength: ${animeData.length}`;

      vorterx.sendMessage(m.from, { image: { url: data.thumbnail }, caption: fg }, { quoted: m });
    } catch (error) {
      console.error('Error occurred:', error);
    }
  },
};
