const axios = require("axios");
const config = require('../../config.js');
const fs = require("fs");

module.exports = {
  name: "xnxxsh",
  description: "18 videos only",
  category: "Downloads",
  async client(vorterx, m, { connect, args }) {
 
    let me = fs.readFileSync("./lib/imogs.jpg");
    if (!args) {
      await connect("❌");
      return m.reply("Please provide a search term.");
    }
    await connect("🍑");

    const res = (await axios(
      `https://raganork-network.vercel.app/api/xvideos/search?query=${args}`
    )).data;

    let textt = `🔎 *XNXXV SEARCH RESULTS* 🔎\n\n🔍 Search Term: ${text}\n\n`;

    for (const [index, video] of res.result.entries()) {
      const videoInfo = `
📽️ *Video ${index + 1}*
🎬 *Title: ${video.title}*
⏰ *Duration: ${video.duration}*
🔗 *[Watch]*(${video.url})\n\n*${config.CAPTION}*`;
      textt += `${videoInfo}\n\n`;
    }

    await vorterx.sendMessage(
      m.from,
      {
        image: me,
        caption: textt,
        captionType: 1,
        captionInfo: {
          markdown: {
            bold: [
              [textt.indexOf("🔎 XNXXV SEARCH RESULTS 🔎"), textt.indexOf("\n\n")],
            ],
            italic: [
              [textt.indexOf("🔍 Search Term"), textt.indexOf("\n\n")],
            ],
          },
        },
      },
      { quoted: m }
    );
  },
};              
