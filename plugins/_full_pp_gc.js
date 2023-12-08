const Jimp = require('jimp');
const fs = require('fs');

module.exports = {
  name: 'gcfullp',
  description: 'Set group full picture dp',
  category: 'Group',
  async client(vorterx, m, { isAdmin, isBotAdmin, mime, connect, quoted, args }) {
    if (!isAdmin) {
      await connect("❌");
      return m.reply("This command is for admins only.");
    }

    if (!isBotAdmin) {
      await connect("❌");
      return m.reply("I am not an admin, sorry.");
    }

    const quotedMessage = await vorterx.decryptMediaMessage(quoted);
    if (!quotedMessage || !quotedMessage.mimetype.includes('image')) {
      await connect("❌");
      return vorterx.sendMessage(m.from, { text: 'Please reply to a picture.' }, { quoted: m });
    }

    await connect("🥊");
    const quotedImageBuffer = await vorterx.downloadMediaMessage(quotedMessage);
    const { preview } = await generatePP(quotedImageBuffer);

    await vorterx.query({
      tag: "iq",
      attrs: {
        to: m.from,
        type: "set",
        xmlns: "w:profile:picture",
      },
      content: [
        {
          tag: "picture",
          attrs: { type: "image" },
          content: preview,
        },
      ],
    });

    fs.unlinkSync(quotedImageBuffer);
    const ppgc = await vorterx.profilePictureUrl(m.from, "image");

    vorterx.sendMessage(
      m.from,
      {
        image: { url: ppgc },
        caption: 'Group Profile Picture has been updated',
      },
      { quoted: m }
    );
  },
};

async function generatePP(buffer) {
  const jimp = await Jimp.read(buffer);
  const min = jimp.getWidth();
  const max = jimp.getHeight();
  const cropped = jimp.crop(0, 0, min, max);
  return {
    img: await cropped.scaleToFit(720, 720).getBufferAsync(Jimp.MIME_JPEG),
    preview: await cropped.normalize().getBufferAsync(Jimp.MIME_JPEG),
  };
                     }
