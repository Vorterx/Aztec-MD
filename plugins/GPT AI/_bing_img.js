const config = require('../../config.js');

module.exports = {
  name: 'bingimg',
  category: 'GPT AI',
  description: 'To download images from Bing',
  async client(vorterx, m, { args, connect, mime, quoted }) {

    if (!args) {
      await connect('❌');
      return m.reply('Please provide an image name, e.g., bingimg Goku...');
    }

    const get_bing = `https://aemt.me/bingimg?text=${encodeURIComponent(args)}`;

    try {
      const res = await fetch(get_bing, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!res.ok) {
        return m.reply(`${res.status}`);
      }

      const data = await res.json();

      if (data && Array.isArray(data) && data.length > 0) {
        const get_img = data[0];

        await vorterx.sendMessage(m.from, {
          image: {
            url: get_img,
            mimetype: mime.getType(get_img.split('.').pop()),
          },
          caption: `*Name*: ${args}\n\n*${config.CAPTION}*`,
        });
      } else {
       await connect('❌');
        return m.reply('No images found for the given args...');
      }
    } catch (error) {
      console.error(error.message || error);
     return m.reply('Please try again later...');
    }
  }
};
      
