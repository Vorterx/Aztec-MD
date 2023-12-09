module.exports = {
  name: 'anime',
  category: 'weebs',
  async client(vorterx, m, { args, text, connect }) {
  
    const axios = require('axios');
    if (!text) {
      return m.reply('Provide an anime name');
    }

    try {
      const response = await axios.get(`https://weeb-api.vercel.app/anime?search=${text}`);
      const data = response.data;

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
        thumbnail: data.thumbnail
      };

      return m.reply(`Anime: ${text}\nStatus: ${animeData.status}\nHashtag: ${animeData.hashtag}\nFormat: ${animeData.format}\nIs Adult: ${animeData.isAdult}\nSeason: ${animeData.season}\nAverage Score: ${animeData.averageScore}\nPopularity: ${animeData.popularity}\nSource: ${animeData.source}\nDuration: ${animeData.duration}\nEpisodes: ${animeData.episodes}\nGenres: ${animeData.genres}\nDescription: ${animeData.description}\nThumbnail: ${animeData.thumbnail}`);
    } catch (error) {
      console.error('Error occurred:', error);
    }
  }
};
