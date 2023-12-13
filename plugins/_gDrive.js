const apiDylux = require('api-dylux');

module.exports = {
  name: 'gdrive',
  category: 'Downloads',
  async client(vorterx, m, { args, connect }) {
   
    if (!args[0]) {
      await connect('❌');
      return m.reply('Please enter the Google Drive link.');
    }

    try {
      await connect('📤');
      const result = await apiDylux.GDriveDl(args[0]);

      const Txt = `
╭–– *『GOOGLE DRIVE DN』*
▢ *Name:* ${result.fileName}
▢ *Size:* ${result.fileSize}
▢ *Type:* ${result.mimetype}`;

      await m.reply(Txt);

      const documentO = {
        document: {
          url: result.downloadUrl,
        },
        fileName: result.fileName,
        mimetype: result.mimetype,
      };

      vorterx.sendMessage(m.from, documentO, { quoted: m });
    } catch {
      m.reply('An error occurred while processing.');
    }
  }
};
