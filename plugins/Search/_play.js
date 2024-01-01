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
    try {
      if (!args && !text) {
        await react("❌");
        return coax.reply("Please provide a search term. Example: play Dubula by Emoh");
      }
      await react("🎵");

      const searchTerm = args || text;
      const search = await yts(searchTerm);
      const getVideo = search.videos[Math.floor(Math.random() * search.videos.length)];

      const thumbnails = await getBuffer(getVideo.thumbnail);

      const get_vid = `
*${getVideo.title}*

1. ⬢ audio
2. ⬢ video

*Send a number 1 or 2*
\n\n*${config.CAPTION}*
      `;

      vorterx.sendMessage(coax.from, { image: thumbnails, caption: get_vid }, { quoted: coax });

           const ytmp4Command = `ytmp4 ${getVideo.url}`;
      const audioCommand = `audio ${getVideo.url}`;

      const userChoice = args.toLowerCase();
      if (userChoice === '1' || userChoice === '2') {
        if (userChoice === '1' && !ytmp4Command.includes("1")) {
          await react('📤');
          await coax.reply('__Downloading your video wait__');
        } else if (userChoice === '2' && !audioCommand.includes("2")) {
          await coax.reply('__Downloading your song wait__');
        } else {
          await coax.reply('_Sorry invalid number reply provide 1 or 2__');
        }
      } else {
        await coax.reply('_Sorry invalid number reply provide 1 or 2__');
      }
    } catch (error) {
      console.error("Error in music search:", error);
      await react("❌");
      return coax.reply("An error occurred while searching for music.");
    }
  }
);
         
