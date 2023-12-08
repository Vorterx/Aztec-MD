module.exports = {
  name: 'img',
  category: 'Downloads',
  async client(vorterx, m, { args, connect }) {
    
    const gis = require('g-i-s');
    try {
      if (!args) {
        await connect('❌');
        return m.reply('Please provide an image name.');
      }

      const [query] = args.split(',');
      const images = await gis(query, { max: 10 });
      if (images.length === 0) {
        return m.reply('No images found for the given query.');
      }
      await connect('📤');
      await m.reply(`Downloading 10 images for ${query}`);
      for (let i = 0; i < 10; i++) {
        const item = images[i];
        const imageUrl = item.url;
        await vorterx.sendMessage(imageUrl, {}, 'image');
       }
     } catch (error) {
      console.error(error);
      await m.reply('An error occurred while processing the request.');
    }
  },
};
