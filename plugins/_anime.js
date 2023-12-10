const { Mal } = require("node-myanimelist");
const fs = require("fs");

module.exports = {
  name: 'anime',
  category: 'Anime',
  async client(vorterx, m, { args, text, connect }) {
    
    try {
      if (!text) {. await connect('❌');
        return m.reply(`Please provide the name of an anime, e.g., "Dragon Ball"`);
      }

      if (malid === undefined) {
        await connect('❌');
        return m.reply(`❌ MyAnimeList username is not set`);
      }

      if (malpass === undefined) {
        await connect('❌');
        return m.reply(`❌ MyAnimeList password is not set`);
      }

        await connect('🔍');
      const auth = Mal.auth("6114d00ca681b7701d1e15fe11a4987e");
      const logIn = await auth.Unstable.login(malid, malpass);
      const anime = await logIn.anime
        .search(text, Mal.Anime.fields().all())
        .call()
        .catch(() => {});

      const result = anime.data[0].node;
      let animeInfo = "";
      
      animeInfo += `**🎀 Title:** ${result.title}\n`;
      animeInfo += `**🎋 Format:** ${result.media_type.toUpperCase()}\n`;
      animeInfo += `**📈 Status:** ${result.status.toUpperCase().replace(/\_/g, " ")}\n`;
      animeInfo += `**🍥 Total episodes:** ${result.num_episodes}\n`;
      animeInfo += `**🧧 Genres:**\n`;
      
      for (let i = 0; i < result.genres.length; i++) {
        animeInfo += `*${result.genres[i].name}*\n`;
      }

      animeInfo += `**✨ Based on:** ${result.source}\n`;
      animeInfo += `**📍 Studios:**\n`;
      
      for (let i = 0; i < result.studios.length; i++) {
        animeInfo += `*${result.studios[i].name}*\n`;
      }

      animeInfo += `**💫 Premiered on:** ${result.start_date}\n`;
      animeInfo += `**🎗 Ended on:** ${result.end_date}\n`;
      animeInfo += `**🎐 Popularity:** ${result.popularity}\n`;
      animeInfo += `**🏅 Rank:** ${result.rank}\n\n`;
      animeInfo += `**🌐 URL:** [MyAnimeList](https://myanimelist.net/anime/${result.id})\n\n`;
      animeInfo += `**❄ Description:** ${result.synopsis.replace(/\[Written by VORTERX Rewrite]/g, "")}`;

      await vorterx.sendMessage(m.from,{ image: { url: result.main_picture.large }, caption: animeInfo },{ quoted: m });
    } catch (err) {
      return m.reply(`The anime "${text}" is not valid`);
    }
  },
};
