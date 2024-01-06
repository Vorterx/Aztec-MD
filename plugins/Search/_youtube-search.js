const axios = require("axios");
const yts = require('yt-search');
const { Zenith } = require('../../lib/_cmd_sxntax.js');


Zenith (
  {
  usage: 'yts',
  category: 'Downloads',
  desc: 'To search anything',
  filename: __filename
  }, async (vorterx, m, react, { args }) => {
   
    if (!args) {
      await react('❌');
      return m.reply('*Provide a query example how to create Aztec*');
    }
    await react('🔍');
    try {
      const results = await yts(args);
      const videos = results.videos.slice(0, 25);
      if (videos.length === 0) {
        await react('❌');
        return m.reply('No YouTube videos found for the given query.');
      }

      let res = '';
      if (videos.length > 0) {
        res = videos.map((video, index) => {
          const searchIndex = index + 1;
          return `*🔎 Search*: ${searchIndex}\n\n` +
            `*📽️ TITLE*: ${video.title}\n` +
            `*👁️ VIEWS*: ${video.views}\n` +
            `*⌛ DURATION*: ${video.timestamp}\n` +
            `*📅 UPLOADED*: ${video.ago}\n` +
            `*🔗 LINK*: ${video.url}\n\n`;
        }).join('');
      }

      const img = videos[0].thumbnail;
      vorterx.sendMessage(m.chat, { image: { url: img }, caption: res }, { quoted: m });
    } catch (error) {
      console.error(error);
      await react('❌');
      m.reply('An error occurred while performing the YouTube search.');
    }
  });
