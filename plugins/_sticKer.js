const axios = require("axios");
const { createSticker, StickerTypes } = require('wa-sticker-formatter');

module.exports = {
  name: 'sticker',
  alias: ['s'],
  category: 'Converct',
  async client(vorterx, m, { args, quoted, connect }) {
   
    try {
      if (!quoted || !quoted.imageMessage) {
        await connect('❌');
        return m.reply('Provide an image to convert');
      }

      await connect('⭐');
      const author = 'vorterx team';

      const imageUrl = quoted.imageMessage.imageUrl;
      const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
      const imageBuffer = response.data;

      const stickerOptions = {
        pack: author,
        type: StickerTypes.FULL,
        quality: 70
       };
     const stickerData = await createSticker(imageBuffer, stickerOptions);

     await vorterx.sendMessage(m.from, { sticker: stickerData }, { quoted: m });
    } catch (err) {
      m.reply("An error occurred while processing");
      console.log(err);
    }
  }
};
