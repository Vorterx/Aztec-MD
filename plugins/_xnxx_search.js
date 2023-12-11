const axios = require("axios");
const fs = require("fs");

module.exports = {
  name: "xnxxsh",
  description: "18 videos only",
  category: "Downloads",
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

    const videoArray = [];

    for (const [index, video] of res.result.entries()) {
      const videoInfo = `
📽️ *Video ${index + 1}*
🎬 Title: ${video.title}
⏰ Duration: ${video.duration}
🔗 [Watch Here](${video.url})
`;
      textt += `${videoInfo}\n\n`;
      videoArray.push({ url: video.url, title: video.title });
    }

    textt += "Please reply with the number of the video you want to watch (e.g., 1, 2, etc.):";

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

    vorterx.onMessage((message) => {
      if (message.from === m.from && message.body.match(/^\d+$/)) {
        const selectedVideoIndex = parseInt(message.body) - 1;
        if (selectedVideoIndex >= 0 && selectedVideoIndex < videoArray.length) {
          const selectedVideo = videoArray[selectedVideoIndex];
          vorterx.sendMessage(m.from, `You selected: ${selectedVideo.title}\nLink: ${selectedVideo.url}`);
        } else {
          vorterx.sendMessage(m.from, "Invalid selection. Please reply with a valid number.");
        }
      }
    });
  },
};
