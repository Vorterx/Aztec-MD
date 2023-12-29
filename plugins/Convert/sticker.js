const { Sticker, StickerTypes } = require('wa-sticker-formatter');
const config = require('../../config.js');

module.exports = {
  name: 'sticker',
  category: 'Convert',
  async client(vorterx, m, { args, mime, isMedia, connect }) {
    try {
      if (isMedia && mime.startsWith('image/')) {
        const mediaData = await vorterx.downloadAndSaveMediaMessage(m);

        const sticker = new Sticker(mediaData, {
          pack: config.CAPTION,
          type: StickerTypes.FULL,
          categories: ['🤩', '🎉'],
          id: '12345',
          quality: 50,
          background: '#000000',
        });
         await connect('✔️');
        const buffer = await sticker.toBuffer();
        vorterx.sendMessage(m.from, buffer, 'sticker');
      } else {
        m.reply('__Please send an image to convert to a sticker__');
      }
    } catch (error) {
      console.error(error);
      m.reply('__Error processing sticker__');
    }
  },
};
