const { Zenith, isUrl } = require('../../lib/functions.js');
const YTM3 = require('../../lib/YTM3.js');
const config = require('../../config.js');

Zenith(
  {
    usage: 'ytmp4',
    category: 'Downloads',
    desc: 'Download YouTube videos',
    filename: __filename
  },
  async (vorterx, coax, react, { args }) => {
  try {
    if (args.length < 1 || !isUrl(args) || !YTM3.isYTUrl(args)) {
      await react('❌');
      return coax.reply('Please provide a valid YouTube video link.');
    }

    const video = await YTM3.mp4(args);
    const { title, duration, quality, videoUrl } = video;

    const caption = `
      *Title:* ${title}
      *Duration:* ${duration}
      *Quality:* ${quality}\n\n*${config.CAPTION}*`;

    await vorterx.sendMessage(coax.from, { video: { url: videoUrl }, caption }, { quoted: coax });
  } catch (error) {
    console.error('Error:', error); 
    await react('❌');
    return coax.reply(`${error.message}`);
  }
      })
                                                   
