const { Zenith, isUrl } = require('../../lib/functions.js');
const YTM3 = require('../../lib/YTM3.js');
const { tiny } = require('@viper-x/fancytext');
const config = require('../../config.js');

Zenith(
  {
    usage: 'ytmp4',
    category: 'Downloads',
    desc: 'Download YouTube videos',
    filename: __filename
  },
  async (vorterx, m, react, { args }) => {
  
    try {
    if (args.length < 1 || !isUrl(args) || !YTM3.isYTUrl(args)) {
      await react('❌');
      return m.reply('Please provide a valid YouTube video link.');
    }

    const video = await YTM3.mp4(args);
    const { duration, quality, videoUrl } = video;
   
    await react('📤');
    const caption = `
*Duration:* ${duration}
*Quality:* ${quality}\n\n*${config.CAPTION}*`;

    await vorterx.sendMessage(m.chat, { video: { url: videoUrl }, tiny(caption) }, { quoted: m });
  } catch (error) {
    console.error('Error:', error); 
    await react('❌');
    return m.reply(`${error.message}`);
      }
    }
 )
        
