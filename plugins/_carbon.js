const axios = require('axios');

module.exports = {
  name: 'carbon',
  description: 'Generate code snippets with Carbon',
  category: 'Makers',
  async xstart(vorterx, m, { text, quoted, mine, arts }) {

  const apiUrl = `https://api.botcahx.live/api/maker/carbon?${text}&apikey=29y8XIYL`;
    try {
      const response = await axios.get(apiUrl);
      const { data } = response;
      const imageUrl = data.image;
   
      const c_aption = 'Generated by Aztec MD';
      await vorterx.sendMessage(m.from, { url: imageUrl, caption: c_aption }, 'image');
      
    } catch (error) {
      console.error('Error:', error.message);
    }
  }
};