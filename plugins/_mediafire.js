const axios = require('axios');

function isValidUrl(string) {
  const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
  return urlRegex.test(string);
}

module.exports = {
  name: 'mediafire',
  category: 'Downloads',
  description: 'Download files from MediaFire links',
  async client(vorterx, m, { text, args, mime, connect }) {
  
  try {
      if (args.length === 0) {
        await connect('❌');
        return m.reply('Please provide a valid MediaFire link.');
      }

      if (!isValidUrl(args[0]) && !args[0].includes('mediafire.com')) {
        return m.reply('Invalid link provided.');
      }

      const { mediaDownloader } = require('../lib/_mediaDL.js');
      const mediaFileInfo = await mediaDownloader(text);

      if (mediaFileInfo[0].size.split('MB')[0] >= 100) {
        await connect('❌');
        return m.reply('The file is too large to download, sorry.');
      }

      const mediaThumbnail = 'https://graph.org/file/1cfd63c7e3a114e89c06c.jpg';

      const downloadInfo = `
╭–– *『MEDIAFIRE DOWNLOAD』*
┆ *Name:* ${mediaFileInfo[0].name}
┆ *Size:* ${mediaFileInfo[0].size}
┆ *Type:* ${mediaFileInfo[0].mime}
╰–––––––––––––––༓`;

      await vorterx.sendMessage(m.from, {
        image: { url: mediaThumbnail },
        caption: downloadInfo,
        document: { url: mediaFileInfo[0].link, fileName: mediaFileInfo[0].name, mimetype: mediaFileInfo[0].mime },
        quoted: m,
      });
    } catch (error) {
      console.error(error);
      m.reply('An error occurred while processing the download.');
    }
  },
};	
