const gis = require('g-i-s');
const { downloadMedia } = require('../lib/index.js');

module.exports = {
  name: 'img',
  alias: ['image'],
  category: 'Downloads',
  description: 'To download images',
  async client(vorterx, m, { text, args, mime, connect, quoted }) {
    try {
      const query = text.trim();
      if (!query) {
        await connect('❌');
        return m.reply(`\`\`\`Please provide the name of the image...\`\`\``);
      }
      
      const search = 10;
      m.reply(`Downloading your *${search}* images...⏳`);
      
      const results = await gis(query);
      if (results && results.length > 0) {
        for (let i = 0; i < Math.min(search, results.length); i++) {
          const image = results[i];
          const imageBuffer = await downloadMedia(image.url); 
          // const imageBuffer = await vorterx.downloadMedia(image.url);
          
          if (imageBuffer) {
            if (!quoted) {
              await vorterx.sendMessage(m.from, { image: { url: imageBuffer } });
            } else {
              await vorterx.sendMessage(m.from, { image: { url: imageBuffer } }, { quoted: m });
            }
          } else {
            m.reply(`\`\`\`Failed to download the image...\`\`\``);
          }
        }
      } else {
        m.reply('No images found for your search...');
      }
    } catch (error) {
      console.error(error);
      m.reply('An error occurred while downloading your img...');
    }
  }
};
