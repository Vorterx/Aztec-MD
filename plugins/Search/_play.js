const { getBuffer } = require("../../lib/_getBuffer.js");
const yts = require("youtube-yts");
const config = require('../../config.js');

module.exports = {
  name: "play",
  description: "Search for music link",
  category: "Downloads",
  async client(vorterx, m, { text, connect }) {
    
    if (!text) {
      await connect("❌");
      return m.reply("Please provide a search term. Example: play Dubula by Emoh");
    }

    await connect("🎵");

    try {
      const search = await yts(text);
      const getVideo = search.videos[Math.floor(Math.random() * search.videos.length)];
      
      const thumbnails = await getBuffer(getVideo.thumbnail);

      const get_vid = `
╭─🎵 *Music Search Results*
│
├ 🎧 *Title*: ${getVideo.title}
├ 🆔 *ID*: ${getVideo.videoId}
├ 👀 *Views*: ${getVideo.views}
├ ⏰ *Uploaded At*: ${getVideo.ago}
├ 👤 *Author*: ${getVideo.author.name}
│
├─🔗 [Watch](${getVideo.url})
│ copy link[<ytmp3>]
╰─────────⭑\n\n*${config.CAPTION}*
      `;

      vorterx.sendMessage(m.from, { image: thumbnails, caption: get_vid }, { quoted: m });
    } catch (error) {
      console.error("Error in music search:", error);
      await connect("❌");
      return m.reply("An error occurred while searching for music.");
    }
  }
};
