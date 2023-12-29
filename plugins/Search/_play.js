const { getBuffer } = require("../../lib/_getBuffer.js");
const yts = require("youtube-yts");
const config = require('../../config.js');

Zenith (
  {
  usage: "play",
  desc: "Search for music link",
  category: "Downloads",
  filename: __filename
  }, async (vorterx, coax, args, react) => {
    
    if (!args) {
      await react("❌");
      return coax.reply("Please provide a search term. Example: play Dubula by Emoh");
    }
    await react("🎵");

    try {
      const search = await yts(args);
      const getVideo = search.videos[Math.floor(Math.random() * search.videos.length)];
      
      const thumbnails = await getBuffer(getVideo.thumbnail);

      const get_vid = `
╭─ *Music Search*
│
├ *Title*: ${getVideo.title}
├ *ID*: ${getVideo.videoId}
├ *Views*: ${getVideo.views}
├ *Uploaded At*: ${getVideo.ago}
├ *Author*: ${getVideo.author.name}
│
├ [Watch](${getVideo.url})
│ copy link[<ytmp3>]
╰─────────⭑\n\n*${config.CAPTION}*
      `;

      vorterx.sendMessage(coax.from, { image: thumbnails, caption: get_vid }, { quoted: coax });
    } catch (error) {
      console.error("Error in music search:", error);
      await react("❌");
      return coax.reply("An error occurred while searching for music.");
    }
  });
