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
      const { direct_link, original_name, size, website } = getAnu.data;
      const mediaUrl = direct_link;
      const getFile = await axios.get(mediaUrl, { responseType: 'stream' });
      const fileBuffer = getFile.data;
      const media_image = "https://graph.org/file/1cfd63c7e3a114e89c06c.jpg";
      const media_DNL= `
    ❲❒❳ 𝙈𝙀𝘿𝙄𝘼𝙁𝙄𝙍𝙀 𝘿𝙉𝙇\n\n
   *〄_Name*: ${original_name}
   *〄_Size*: ${size}
   *〄_Website*: ${website}`;

      vorterx.sendMessage(m.from, { image: { url: media_image }, document: { buffer: fileBuffer, mimetype: mime }, caption: media_DNL });
    } catch (error) {
      console.error(error);
      m.reply('An error occurred while downloading the file.');
    }
  },
};
