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
  async (vorterx, coax, react, { args,text }) => {
    let getVideo; 

    if (!args) {
      await react("❌");
      return coax.reply("Please provide a search term. Example: play Dubula by Emoh");
    }
    await react("🎵");

    try {
      const search = await yts(args);
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

    if (coax.text) {
      const lowerText = coax.text.toLowerCase();

      if (lowerText === '1') {
        return vorterx.sendMessage(coax.from, `${prefix}audio ${getVideo.url}`);
      } else if (lowerText === '2') {
        return vorterx.sendMessage(coax.from, `${prefix}ytmp4 ${getVideo.url}`);
      } else {
        await react('❌');
        return coax.reply('Invalid selection. Please choose 1 or 2.');
      }
    } else {
      console.error("coax.text is undefined");
      return coax.reply("An error occurred. Please try again.");
    }
  }
);
  
