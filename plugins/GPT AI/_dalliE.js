const axios = require('axios');

module.exports = {
  name: 'dalli',
  alias: ['imagine'],
  category: 'GPT AI',
  async client(vorterx, m, { args, connect }) {
    try {
        if (!args) {
        await connect('❌');
        return m.reply('__Provide a name___...');
      }

      const search = args;
      const get = await axios.get(`https://v2-guru-indratensei.cloud.okteto.net/scrape?query=${search}`);
      const data = get.data;
      const dalle_img = data.image_links;
      const aztec = `*Name*: ${search}\n\n*${config.CAPTION}*`;

      const get_img = dalle_img[Math.floor(Math.random() * dalle_img.length)];
      await vorterx.sendMessage(m.from, {
        image: { url: get_img },
        caption: aztec
      }, { quoted: m });

    } catch (error) {
      console.error(error.message);
      await connect('❌');
      m.reply('An unexpected error occurred. Please try again later...');
    }
  }
};
    
