const malScraper = require('mal-scraper');

module.exports = {
  name: 'anime',
  category: 'Anime',
  async client(vorterx, m, { args, text, connect }) {
    try {
      if (!text) {
        await connect('❌');
        return m.reply(`🚫 Please provide the name of an anime, e.g., "Dragon Ball"`);
     }
      const animeInfo = await malScraper.getInfoFromName(text).catch(() => null);
      if (!animeInfo) {
        await connect('❌');
        return m.reply(`❗ Sorry, couldn't retrieve data for the provided anime name.`);
      }

      const {
        title,
        type,
        premiered,
        episodes,
        status,
        genres,
        studios,
        score,
        rating,
        ranked,
        popularity,
        trailer,
        synopsis,
        picture,
      } = animeInfo;

      const list = `
*ANIMATION INFORMATION*\n\n
- 🎀**Title:** ${title}
- 🌷**Type:** ${type}
- 🌵**Premiered on:** ${premiered}
- 💫**Total Episodes:** ${episodes}
- 📈**Status:** ${status}
- 🧧**Genres:** ${genres}
- 🎋**Studio:** ${studios}
- 🕹️**Score:** ${score}
- 🌟**Rating:** ${rating}
- 📍**Rank:** ${ranked}
- 🎗**Popularity:** ${popularity}
- 🎃**Trailer:** ${trailer}
- ❄**Description:**  ${synopsis}`;

      await vorterx.sendMessage(m.from, { image: { url: picture }, caption: list }, { quoted: m });
    } catch (error) {
      console.error(error);
      await connect('❌');
      return m.reply(`❌ An error occurred while processing the request.`);
    }
  },
};          
