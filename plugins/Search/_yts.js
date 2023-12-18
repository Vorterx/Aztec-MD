// AZTEC MD V3.0.0

// @©2023

const axios = require("axios");
const yts = require('yt-search');

module.exports = {
  name: 'yts',
  description: 'To search anything',
  category: 'Downloads',
  async client(vorterx, m,{  connect, text, args }) {
   
    if (!text) {
      await connect('⛔');
      return m.reply('*Provide a query example how to create Aztec*');
    }

    await connect('🔍');
    try {
      const results = await yts(text);
      const videos = results.videos.slice(0, 15);
      if (videos.length === 0) {
        await connect('❌');
        return m.reply('No YouTube videos found for the given query.');
      }

      let response = '';
      if (videos.length > 0) {
        response = videos.map((video, index) => {
          const searchIndex = index + 1;
          return `🔎 Search: ${searchIndex}\n\n` +
            `📽️ TITLE: ${video.title}\n` +
            `👁️ VIEWS: ${video.views}\n` +
            `⌛ DURATION: ${video.timestamp}\n` +
            `📅 UPLOADED: ${video.ago}\n` +
            `🔗 LINK: ${video.url}\n\n`;
        }).join('');
      }

      const thumbnailUrl = videos[0].thumbnail;
      vorterx.sendMessage(m.from, { image: { url: thumbnailUrl }, caption: response }, { quoted: m });
    } catch (error) {
      console.error(error);
      await connect('❌');
      m.reply('An error occurred while performing the YouTube search.');
    }
  },
};
