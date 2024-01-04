Zenith(
  {
  usage: 'insta',
  alias: ['ig'],
  category: 'Downloads',
  decs: 'to download insta vids',
  filename: __filename
  }, async (vorterx, m, react, {args}) => {
   
    if (!args) {
      await react('❌');
      return m.reply('Please provide a valid Instagram URL.');
    }

    try {
      const url = args;
      const data = await igdl(url);
      if (!data || data.length === 0) {
        return m.reply('Failed to download the video.');
      }

      console.log(data);
      await react('📤');
      coax.reply(`\`\`\`Downloading your video, please wait...⏳\`\`\``);

      for (let i of data) {
        const { quality, size, url } = i;
        const vidi = `*Quality* : 420p\n\n*${config.CAPTION}*`;

        vorterx.sendMessage(m.chat, { video: { url }, caption: tiny(vidi)}, {quoted: m });
      }
    } catch (error) {
      console.error(error);
      return m.reply('Failed to download the video.');
    }
  });
