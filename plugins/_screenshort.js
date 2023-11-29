const axios = require('axios');

module.exports = {
  name: 'ss',
  alias: ['screenshort'],
  category: 'General',
  async xstart(vorterx, m, { text, args, quoted, xReact }) {
     
    if (args.length === 0) {
      await xReact('❌');
       return m.reply('_Invalid command. Please provide a URL._');
    }

    const url = args[0];
    const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
    if (!url.match(urlRegex)) {
      await xReact('❌');
      return m.reply('_Invalid URL format. Please provide a valid URL._');
    }
   
    try {
      await xReact('📸');
      const response = await axios.get(`https://vihangayt.me/tools/ssweb?url=${encodeURIComponent(url)}`);
      if (response.status !== 200) {
        m.reply('Error occurred on API.');
      }
      const screenshotImage = response.data;
      vorterx.sendMessage(m.from, { url: screenshotImage, caption: 'BY WhatsApp CHATBOT' }, 'image', { quoted: m });

    } catch (error) {  
      console.error(error);
      m.reply('Failed to capture screenshot. Please try again later.');
    }
  }
};
