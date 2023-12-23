// AZTEC MD V3.0.0

// @©2023

const axios = require("axios");
const yts = require('yt-search');

module.exports = {
  name: 'yts',
  description: 'To search anything',
  category: 'Downloads',
  async client(vorterx, m,{  connect,  args }) {
   
    if (!args) {
      await connect('❌');
      return m.reply('*Provide a query example how to create Aztec*');
    }

    await connect('🔍');
    try {
      const results = await yts(args);
      const videos = results.videos.slice(0, 15);
      if (videos.length === 0) {
        await connect('❌');
        return m.reply('No YouTube videos found for the given query.');
      }

      let res = '';
      if (videos.length > 0) {
        res = videos.map((video, index) => {
          const searchIndex = index + 1;
          return `🔎 Search: ${searchIndex}\n\n` +
            `📽️ TITLE: ${video.title}\n` +
            `👁️ VIEWS: ${video.views}\n` +
            `⌛ DURATION: ${video.timestamp}\n` +
            `📅 UPLOADED: ${video.ago}\n` +
            `🔗 LINK: ${video.url}\n\n`;
        }).join('');
      }

      const img = videos[0].thumbnail;
      vorterx.sendMessage(m.from, { image: { url: img }, caption: res }, { quoted: m });
    } catch (error) {
      console.error(error);
      await connect('❌');
      m.reply('An error occurred while performing the YouTube search.');
    }
  },
};
