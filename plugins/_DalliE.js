const axios = require('axios');

 module.exports = {
   name: 'dalli',
   alias: ['dallie'],
   description: 'To download via ai',
   category: 'GPT AI',
   async client(vorterx,m,{ text, args, connect }) {
     
  if (!text) {
    await connect('❌');
    return m.reply('Please provide a text for search');
  }

  try {
    const response = await axios.get(`https://api.botcahx.live/api/search/openai-image?text=${text}&apikey=29y8XIYL`);

    const image = response.data;
    const imageUrl = image.image;
    const imageWidth = image.width;
    const imageHeight = image.height;
    const imageSize = image.size;

    const caption = `Dimensions: ${imageWidth} x ${imageHeight}\nSize: ${imageSize}`;
    vorterx.sendMessage(m.from, { image: { url: imageUrl }, caption: caption });
  } catch (error) {
    console.error('Error fetching image:', error);
    m.reply('An error occurred while processing');
  }
}}
