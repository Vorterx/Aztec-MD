//=====BY DIEGOSON 
//====================AZTEC-MD @©2023

const axios = require("axios");
const fs = require("fs");

module.exports = {
  name: "xnxxsh",
  description: "18 videos only",
  category: "Download",
  async client(vorterx, m, { connect, text, args }) {
    let me = fs.readFileSync("./lib/imogs.jpg");

    if (!text) {
    await connect("⛔");
    return m.reply("Please provide a search term.");
    }
    await connect("🍑");

    const res = (await axios(
   `https://raganork-network.vercel.app/api/xvideos/search?query=${text}`
    )).data;

  let textt = `🔎 *XNXXV SEARCH RESULTS* 🔎\n\n🔍 Search Term: ${text}\n\n`;

 for (const [index, video] of res.result.entries()) {
 const D3centX = `
📽️ *Video ${index + 1}*
🎬 Title: ${video.title}
⏰ Duration: ${video.duration}
🔗 [Watch Here](${video.url})
`;

    textt += D3centX;
    }

    return vorterx.sendMessage(m.from, {
      image: me,
      caption: textt,
      captionType: 1,
      captionInfo: {
        markdown: {
        bold: [[textt.indexOf("🔎 XNXXV SEARCH RESULTS 🔎"), textt.indexOf("\n\n")]],
        italic: [[textt.indexOf("🔍 Search Term"), textt.indexOf("\n\n")]],
        },
        },
        messageOptions: {
        textColor: "#ffffff", 
        backgroundColor: "#333333", 
        footerBackgroundColor: "#222222", },  }, {quoted: m,
      });
     },
    };
