const axios = require('axios');
const { createWriteStream } = require('fs');

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
      const response = await axios.get(apiUrl);
      const { direct_link, original_name, size, version, website } = response.data;
      
      const mediaUrl = direct_link;
      
      const getFile = await axios.get(mediaUrl, { responseType: 'stream' });
      const fileName = original_name;
      const filePath = `../lib/downloads/${fileName}`;
      const writer = createWriteStream(filePath);

      getFile.data.pipe(writer);

      writer.on('finish', () => {
      const caption = `Name: ${original_name}\nVersion: ${version}\nSize: ${size}\nWebsite: ${website}`;       
        vorterx.sendMessage(m.from, { file: filePath, caption });
      });

      writer.on('error', (error) => {
        console.error(error);
        m.reply('An error occurred while downloading the file.');
      });
    } catch (error) {
      console.error(error);
      m.reply('An error occurred while downloading the file.');
    }
  },
};

