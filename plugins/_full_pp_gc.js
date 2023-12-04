const Jimp = require('jimp');
const fs = require('fs');

module.exports = {
  name: 'gcfullp',
  description: 'Set group full picture dp',
  category: 'Group',
  async xstart(vorterx, m, { isAdmin, isBotAdmin, mime, connect, text, quoted, args }) {
   
    if (!isAdmin) {
      await connect("❌");
      return m.reply('This command is only for group admins');
    }

    if (!isBotAdmin) {
      await connect("❌");
      return m.reply('I must be an admin for me to help');
    }

    const quotedMessage = m.quoted;

    if (!quotedMessage || !quotedMessage.mimetype.includes('image')) {
      await connect("❌");
      return vorterx.sendMessage(m.from, { text: 'Please reply to a picture' }, { quoted: m });
    }

    await connect('📷');

    try {
      const quotedImageBuffer = await vorterx.downloadMediaMessage(quotedMessage);
      const { img, preview } = await generatePP(quotedImageBuffer);

      await updateGroupProfilePicture(vorterx, m.from, preview);
      fs.unlinkSync(quotedImageBuffer);

      const groupPpUrl = await getGroupProfilePictureUrl(vorterx, m.from);
      await sendProfilePictureUpdatedMessage(vorterx, m.from, groupPpUrl, m);
    } catch (error) {
      console.error('An error occurred:', error);
      await connect("❌");
      return m.reply('An error occurred while setting the group profile picture');
    }
   },
 };

 async function generatePP(buffer) {
  const jimp = await Jimp.read(buffer);
  const min = jimp.getWidth();
  const max = jimp.getHeight();
  const cropped = jimp.crop(0, 0, min, max);
  return { img: await cropped.scaleToFit(720, 720).getBufferAsync(Jimp.MIME_JPEG),
    preview: await cropped.normalize().getBufferAsync(Jimp.MIME_JPEG),
  };
}

async function updateGroupProfilePicture(vorterx, groupId, previewImageBuffer) {
  return vorterx.updateProfilePicture(groupId, previewImageBuffer);
}

async function getGroupProfilePictureUrl(vorterx, groupId) {
  return vorterx.getProfilePicture(groupId, { thumbnail: false });
}

async function sendProfilePictureUpdatedMessage(vorterx, groupId, groupPpUrl, originalMessage) {
  await vorterx.sendMessage(groupId, { image: { url: groupPpUrl }, caption: 'Profile picture has been updated' }, { quoted: originalMessage });
        }
