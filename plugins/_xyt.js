//  AZTEC MD V3.0.0

// MADE WITH LUV BY DIEGOSON

const { getBuffer } = require("../connects/myFunc.js");
const yts = require("youtube-yts");

module.exports = {
  name: "xyt",
  description: "Search for music link",
  category: "Downloads",
  async xstart(vorterx, m, { xReact, text }) {
    
    if (!text) {
      await xReact("⛔");
      return m.reply("Please provide a search term. Example: xyt hope");
    }

    await xReact("🎵");
    const search = await yts(text);
    const getVideo = search.videos[Math.floor(Math.random() * search.videos.length)];
    const thumbnail = await getBuffer(getVideo.thumbnail);

    const get_Video = `
🎧 *${getVideo.title}*
🆔 *ID*: ${getVideo.videoId}
👀 *Views*: ${getVideo.views}
⏰ *Uploaded At*: ${getVideo.ago}
👤 *Author*: ${getVideo.author.name}
🔗 [Watch on YouTube](${getVideo.url})
    `;

    const D3centX = `
╭─🎵 *Music Search Results*
│
├ 🎧 *Title*: ${getVideo.title}
├ 🆔 *ID*: ${getVideo.videoId}
├ 👀 *Views*: ${getVideo.views}
├ ⏰ *Uploaded At*: ${getVideo.ago}
├ 👤 *Author*: ${getVideo.author.name}
│
├─🔗 [Watch on YouTube](${getVideo.url})
│
╰─────────⭑`;

    vorterx.sendMessage(m.from, { image: thumbnail, caption: D3centX }, { quoted: m });
    }
  }
