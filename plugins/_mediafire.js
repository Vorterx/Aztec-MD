/
const axios = require('axios');
const { createWriteStream } = require('fs');
const { name, description } = require('./config.json');

module.exports = {
  name: 'mediafire',
  description: 'To Download using media fire link',
  async xstart(vorterx, m, { text, args, mime, quoted }) {
    
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
      
      const downloadUrl = direct_link;
      
      const downloadResponse = await axios.get(downloadUrl, { responseType: 'stream' });
      const fileName = original_name;
      const filePath = `./downloads/${fileName}`;
      const writer = createWriteStream(filePath);

      downloadResponse.data.pipe(writer);

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

