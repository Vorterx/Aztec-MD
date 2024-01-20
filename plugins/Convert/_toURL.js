const { Zenith, telegraph } = require('../../lib/functions');

Zenith(
  {
    usage: 'url',
    desc: 'Convert image or video to URL',
    category: 'Convert',
  },
  async (vorterx, m, react, { args, mime, quoted }) => {
   
    if (!(image(mime) || video(mime))) {
      await react('❌');
      return m.reply('*_Provide an image or video, please_*');
    }

    let media = quoted ? quoted : m;
    try {
      await react('🌀');
      let IMG_VIDEO = await telegraph(media);
      await vorterx.sendMessage(m.chat, { text: IMG_VIDEO });
    } catch (error) {
      console.error(error.message);
      await react('❌');
      return m.reply('*_Error occurred while converting media to URL_*');
    }
  }
);
      
