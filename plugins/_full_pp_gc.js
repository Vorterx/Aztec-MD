const Jimp = require('jimp');
const fs = require('fs');

module.exports = {
  name: 'gcfullp',
  description: 'Set group full picture dp',
  category: 'Group',
  async client(vorterx, m, { isAdmin, isBotAdmin, mime, connect, quoted }) {
    if (!isAdmin) return connect("❌") && m.reply("This command is for admins only.");
    if (!isBotAdmin) return connect("❌") && m.reply("I am not an admin, sorry.");
    if (!/image/.test(mime)) return connect("❌") && vorterx.sendMessage(m.from, { text: 'Please reply to a picture.' }, { quoted: m });
    connect("🥊");
    const quotedimage = await vorterx.downloadAndSaveMediaMessage(quoted);
    const { preview } = await generatePP(quotedimage);
    await vorterx.query({
      tag: "iq",
      attrs: { to: m.from, type: "set", xmlns: "w:profile:picture" },
      content: [{ tag: "picture", attrs: { type: "image" }, content: preview }],
    });
    fs.unlinkSync(quotedimage);
    const ppgc = await vorterx.profilePictureUrl(m.from, "image");
    vorterx.sendMessage(m.from, { image: { url: ppgc }, caption: 'Group Profile Picture has been updated' }, { quoted: m });
  },
};
async function generatePP(buffer) {
  const jimp = await Jimp.read(buffer);
  const cropped = jimp.crop(0, 0, jimp.getWidth(), jimp.getHeight());
  return {
    img: await cropped.scaleToFit(720, 720).getBufferAsync(Jimp.MIME_JPEG),
    preview: await cropped.normalize().getBufferAsync(Jimp.MIME_JPEG),
  };
  }
