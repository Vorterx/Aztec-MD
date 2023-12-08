module.exports = {
  name: 'img',
  category: 'Downloads',
  async client(vorterx, m, { args }) {
    const gis = require('g-i-s');

    try {
      if (!args || typeof args !== 'string') {
        return m.reply('Please provide an image name.');
      }

      const query = args.trim();
      const images = await gis(query, { max: 10 });

      if (images.length === 0) {
        return m.reply('No images found for the given query.');
      }

      await m.reply(`Downloading ${images.length} images for ${query}`);

      for (let i = 0; i < Math.min(10, images.length); i++) {
        const item = images[i];
        const imageUrl = item.url;
        await vorterx.sendMessage(imageUrl, {}, 'image');
      }

      await m.reply(`Downloaded ${Math.min(10, images.length)} images for ${query}`);
    } catch (error) {
      console.error(error);
      m.reply('An error occurred while processing the request.');
    }
  },
};
