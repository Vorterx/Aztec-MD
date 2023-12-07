const axios = require("axios");
const { createSticker, StickerTypes } = require('wa-sticker-formatter');

module.exports = {
  name: 'sticker',
  alias: ['s'],
  category: 'Convert',
  async client(vorterx, m, { args, quoted, connect }) {
    try {
      if (!quoted || !quoted.msg || !quoted.msg.imageMessage) {
        await connect('❌');
        return m.reply('Please reply to an image to convert');
      }

      await connect('⭐');
      const author = 'vorterx team';

      const imageUrl = quoted.msg.imageMessage.imageUrl;
      const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
      const imageBuffer = Buffer.from(response.data, 'binary');

      const stickerOptions = {
        author,
        type: StickerTypes.FULL,
        quality: 70
      };

      const stickerData = await createSticker(imageBuffer, stickerOptions);

      await vorterx.sendMessage(m.from, { sticker: stickerData }, { quoted: m });
    } catch (err) {
      console.error(err);
      await m.reply("An error occurred while processing the image");
    }
  }
};
