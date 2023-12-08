const ytdl = require('ytdl-core');
const yts = require('youtube-search');
const fs = require('fs');
const { pipeline } = require('stream');
const { promisify } = require('util');
const tmp = require('tmp-promise');
const axios = require('axios');
const streamPipeline = promisify(pipeline);

function vorterx_react(emojis) {
  const Index = Math.floor(Math.random() * emojis.length);
  return emojis[Index];
}

module.exports = {
  name: 'song',
  alias: ['play', 'audio'],
  description: 'To download random music',
  category: 'Downloads',
  async client(vorterx, m, { connect, text }) {
    if (!text) {
      await connect('❌');
      return m.reply('Please provide the name of a song.');
    }

    try {
      const query = encodeURIComponent(text);
      const response = await axios.get(`https://gurubot.com/ytsearch?text=${query}`);
      const results = response.data.results;
      if (!results || results.length === 0) {
        await connect('❌');
        m.reply('Could not proceed, sorry');
        return;
      }

      const final = results[0];
      const { title, thumbnail, duration, views, uploaded, url } = final;
      const replyMessage = `Downloading your '${title}'... ⏳`;
      await vorterx.sendMessage(m.from, replyMessage, { quoted: m });

      const audioStream = ytdl(url, {
        filter: 'audioonly',
        quality: 'highestaudio',
      });

      const { path: tmpDir } = await tmp.dir();
      const writableStream = fs.createWriteStream(`${tmpDir}/${title}.mp3`);
      await streamPipeline(audioStream, writableStream);

      const doc = {
        audio: {
          url: `${tmpDir}/${title}.mp3`,
        },
        mimetype: 'audio/mpeg',
        ptt: false,
        waveform: [100, 0, 0, 0, 0, 0, 100],
        fileName: `${title}`,
        contextInfo: {
          externalAdReply: {
            showAdAttribution: true,
            mediaType: 2,
            mediaUrl: url,
            title: title,
            body: 'SONG DOWNLOADED',
            sourceUrl: url,
            thumbnail: thumbnail,
          },
        },
      };

      await vorterx.sendMessage(m.from, doc, { quoted: m });
      const emojis = ['🎵', '🎶', '🎧', '🎼', '🎤'];

      const aztec_react = vorterx_react(emojis);
      await connect(aztec_react);

      fs.unlink(`${tmpDir}/${title}.mp3`, (err) => {
        if (err) {
          console.error(err);
        }
      });
    } catch (error) {
      console.error(error);
    }
  },
};
