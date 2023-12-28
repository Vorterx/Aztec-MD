const uploadToImgur = require('../../lib/_imgur.js');
const fs = require('fs');
const config = require('../../config.js');

module.exports = {
  name: 'tourl',
  category: 'Convert',
  async client(vorterx, m, { args, connect, mime, quoted }) {
    if (!m.quoted) {
      await connect('❌');
      return m.reply('Please reply to a message with an image or video...');
    }

    const res = m.quoted;
    const mimeType = res.mimetype || '';

    if (!mimeType) {
      await connect('❌');
      return m.reply('Please reply to a video or an image...');
    }

    const convertedMedia = await res.download();
    if (convertedMedia.length > 10 * 1024 * 1024) {
      await connect('❌');
      return m.reply('Sorry, the image size is too large...');
    }
    await connect('✔️');

    const isImage = /image/.test(mimeType);
    const isVideo = /video/.test(mimeType);

    if (isImage || isVideo) {
      const link = await uploadToImgur(convertedMedia);
      const fileSizeMB = (convertedMedia.length / (1024 * 1024)).toFixed(2);
      m.reply(
        `*Media Converted*\n\n` +
        `*Size:* ${fileSizeMB} MB\n` +
        `*[LINK]*(${link})*\n\n` +
        `*${config.CAPTION}*`
      );
    } else {
      m.reply(`${convertedMedia.length} Byte(s)`);
    }
  },
};
        
