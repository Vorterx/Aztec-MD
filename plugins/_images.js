const gis = require('async-g-i-s');
const { downloadMedia } = require('../lib/message/D3centX.js');

module.exports = {
  name: 'img',
  alias: ['image'],
  category: 'Downloads',
  description: 'To download images',
  async xstart(vorterx, m, { text, args, mime, quoted }) {
   
    try {
      const query = text.trim();      
      if (!query) {
        await xReact('❌');
        return m.reply(`\`\`\`Please provide the name of the image...\`\`\``);
      }
      
      const search = 10;
      m.reply(`\`\`\`Downloading your\`\`\ *${search}* `\`\`\images...⏳\`\`\``);
       const results = await gis(query);
      if (results.length > 0) {
        for (let i = 0; i < search; i++) {
          const image = results[i];
          const imageBuffer = await vorterx.downloadMedia(image.url);
          
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
