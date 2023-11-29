const axios = require('axios');

module.exports = {
  name: 'mediafire',
  category: 'Downloads',
  description: 'To Download using media fire link',
  async xstart(vorterx, m, { text, args, mime, xReact, quoted }) {

    const urlRegExp = /(https?:\/\/[^\s]+)/g;
    const mediaFireUrl = text.match(urlRegExp)?.[0];

    if (!mediaFireUrl) {
      await xReact('❌');
      return m.reply('_Please provide a MediaFire URL.');
    }

    const apiUrl = `https://vihangayt.me/download/mediafire?url=${encodeURIComponent(mediaFireUrl)}`;

    try {
      await xReact('📤');
      const getAnu = await axios.get(apiUrl);
      const { direct_link, original_name, size, version, website } = getAnu.data;

      const mediaUrl = direct_link;

      const getFile = await axios.get(mediaUrl, { responseType: 'stream' });
      const fileBuffer = getFile.data;

      const caption = `
      *〄_Name*: ${original_name}\n
      *〄_Version*: ${version}\n
      *〄_Size*: ${size}\n
      *〄_Website*: ${website}`;
      vorterx.sendMessage(m.from, { document: { buffer: fileBuffer, mimetype: mime }, caption });
    } catch (error) {
      console.error(error);
      m.reply('An error occurred while downloading the file.');
    }
  },
};
