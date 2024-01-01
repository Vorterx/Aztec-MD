const { getBuffer } = require("../../lib/_getBuffer.js");
const yts = require("youtube-yts");
const config = require('../../config.js');
const { Zenith } = require('../../lib/_cmd_sxntax.js');
const prefix = process.env.PREFIX;

Zenith(
  {
    usage: "play",
    desc: "Search for music link",
    category: "Downloads",
    filename: __filename,
  },
  async (vorterx, coax, react, { args, text }) => {
    let getVideo;

    if (!args && !text) {
      await react("❌");
      return coax.reply("Please provide a search term. Example: play Dubula by Emoh");
    }
    await react("🎵");

    try {
      const searchTerm = args || text; // Use args if available, otherwise use text
      const search = await yts(searchTerm);
      getVideo = search.videos[Math.floor(Math.random() * search.videos.length)];

      const thumbnails = await getBuffer(getVideo.thumbnail);

      const get_vid = `
*${getVideo.title}*

1. ⬢ audio
2. ⬢ video

*Send a number 1 or 2*
\n\n*${config.CAPTION}*
      `;

      vorterx.sendMessage(coax.from, { image: thumbnails, caption: get_vid }, { quoted: coax });
    } catch (error) {
      console.error("Error in music search:", error);
      await react("❌");
      return coax.reply("An error occurred while searching for music.");
    }

    switch ((args || text).toLowerCase()) {
      case '1':
        return vorterx.sendMessage(coax.from, `${prefix}audio ${getVideo.url}`);
      case '2':
        return vorterx.sendMessage(coax.from, `${prefix}ytmp4 ${getVideo.url}`);
      default:
        await react('❌');
        return coax.reply('Invalid selection. Please choose 1 or 2.');
    }
  }
);
    
