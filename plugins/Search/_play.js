const ytdl = require('ytdl-core');
const fs = require('fs');
const path = require('path');
const { getBuffer } = require("../../lib/_getBuffer.js");
const yts = require("youtube-yts");
const config = require('../../config.js');
const { Zenith } = require('../../lib/_cmd_sxntax.js');

Zenith(
  {
    usage: "play",
    desc: "Search for music link",
    category: "Downloads",
    filename: __filename,
  },
  async (vorterx, coax, react, { args }) => {
    try {
      if (!args) {
        await react("❌");
        return coax.reply("Please provide a search term. Example: play Dubula by Emoh");
      }
      await react("🎵");

      const searchTerm = args;
      const search = await yts(searchTerm);
      const getVideo = search.videos[Math.floor(Math.random() * search.videos.length)];

      const thumbnails = await getBuffer(getVideo.thumbnail);

      const get_vid = `
*${getVideo.title}*

1. audio
2. video

*Send a number 1 or 2*
\n\n*${config.CAPTION}*
      `;

      const quotedMsg = `*VORTERX MUSIC DOWNLOADER*\n"${get_vid}"`;

      vorterx.sendMessage(coax.from, { image: thumbnails, caption: quotedMsg }, { quoted: coax });

      console.log("Sent initial message with video info");

      Zenith({ on: 'text', desc: 'Downloading from media' }, async (vorterx, coax, react, { args }) => {
        console.log("Received text event");

        if (getVideo.url && (args[0] === "1" || args[0] === "2")) {
          const url = getVideo.url;

          if (args[0] === "1") {
            const videoStream = ytdl(url, { quality: 'highestvideo' });
            const doVideo = path.join(__dirname, '..', '..', 'lib', 'downloads', 'video.mp4');
            videoStream.pipe(fs.createWriteStream(doVideo)).on('finish', () => {
              vorterx.sendMessage(coax.from, { video: doVideo }, { quoted: coax });
              console.log("Sent video");
            });
          } else if (args[0] === "2") {
            const audioStream = ytdl(url, { quality: 'highestaudio' });
            const getMusic = path.join(__dirname, '..', '..', 'lib', 'downloads', 'audio.mp3');
            audioStream.pipe(fs.createWriteStream(getMusic)).on('finish', () => {
              vorterx.sendMessage(coax.from, { audio: getMusic }, { quoted: coax });
              console.log("Sent audio");
            });
          }
        }
      });

    } catch (error) {
      console.error(error);
    }
  }
);
      
