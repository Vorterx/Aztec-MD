const axios = require("axios");
const config = require('../../config.js');
const { Zenith } = require('../../lib/_cmd_sxntax.js');

Zenith(
  {
    usage: "xnxxsh",
    desc: "18+ videos only",
    category: "Downloads",
    filename: __filename,
  },
  async (vorterx, coax, react, { args }) => {
    if (!args) {
      await react("❌");
      return coax.reply("Please provide a search term.");
    }

    await react("🍑");

    try {
      const res = await axios.get(`https://raganork-network.vercel.app/api/xvideos/search?query=${args}`);
      const result = res.data.result;

      if (!result || !Array.isArray(result) || result.length === 0) {
        await react("❌");
        return coax.reply("No results found for the given search term.");
      }

      let textt = `🔎 *XNXXV SEARCH RESULTS* 🔎\n\n🔍 Search Term: ${args}\n\n`;
      
      result.forEach((video, index) => {
        if (video.title && video.duration && video.url) {
          const videoInfo = `
📽️ *Video ${index + 1}*
🎬 *Title: ${video.title}*
⏰ *Duration: ${video.duration}*
🔗 *[Watch]*(${video.url})\n\n*${config.CAPTION}*`;
          textt += `${videoInfo}\n\n`;
        }
      });

      await vorterx.sendMessage(coax.from, textt, { quoted: coax, markdown: true });
    } catch (error) {
      console.error("Error fetching data:", error);
      await react("❌");
      return coax.reply("An error occurred while fetching data.");
    }
  }
);
    
