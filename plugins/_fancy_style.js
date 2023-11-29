const axios = require('axios');

module.exports = {
  name: 'fancy',
  async xstart(vorterx, m, { text, args, quoted, xReact }) {
    
    if (args.length < 2) { 
      if (args.length === 1 && text.toLowerCase() === 'fancy') {
        args.push('VORTERX');
      } else {
        await xReact('❌');
        return m.reply('Please use the command in the following format: fancy [1-20] [text]');
      }
    }

    let userStyle = parseInt(args[0]);
    if (isNaN(userStyle) || userStyle < 1 || userStyle> 20) {
      return m.reply('Please provide a number of fancy levels between 1 and 20.');
    }

    const customText = args.slice(1).join(' ');
    try {
      await xReact('📇');
      const get = await axios.get(`https://api.botcahx.live/api/tools/styletext?text=${encodeURIComponent(customText)}&apikey=29y8XIYL`);
      if (get.data) {
        let sendFancy = get.data;
        for (let i = 0; i < userStyle; i++) {
          sendFancy = `*${sendFancy}*`;
        }
        m.reply(sendFancy);
      } else {
        m.reply('_Failed to style the text. Please try again later.');
      }
    } catch (error) {
      console.error('An error occurred while styling the text:', error);
      m.reply('_An error occurred. Please try again later.');
    }
  }
};
