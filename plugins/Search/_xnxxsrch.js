const axios = require("axios");
const config = require('../../config.js');
const fs = require("fs");

Zenith( 
  {  
  usage: "xnxxsh",
  desc: "18 videos only",
  category: "Downloads",
  filename: __filename
  }, async (vorterx, coax, react, args) => {
 
    if (!args) {
      await react("❌");
      return coax.reply("Please provide a search term.");
    }
    await react("🍑");

    const res = (await axios(
      `https://raganork-network.vercel.app/api/xvideos/search?query=${args}`
    )).data;
    let textt = `🔎 *XNXXV SEARCH RESULTS* 🔎\n\n🔍 Search Term: ${args}\n\n`;
    for (const [index, video] of res.result.entries()) {
      const videoInfo = `
📽️ *Video ${index + 1}*
🎬 *Title: ${video.title}*
⏰ *Duration: ${video.duration}*
🔗 *[Watch]*(${video.url})\n\n*${config.CAPTION}*`;
      textt += `${videoInfo}\n\n`;
    }

    await vorterx.sendMessage(
      coax.from,
      {
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
      { quoted: coax }
    ); 
  });              
