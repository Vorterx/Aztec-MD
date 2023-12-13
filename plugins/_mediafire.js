const axios = require('axios');

module.exports = {
  name: 'mediafire',
  category: 'Downloads',
  description: 'To Download using media fire link',
  async client(vorterx, m, { text, args, mime, connect, quoted }) {
   
	if (args.length == 0) {
    await connect('❌');
    return m.reply(`Please provide a MediaFire link...`)
  }
    
	if (!isUrl(args[0]) && !args[0].includes('mediafire.com')) return replygcxeon(`The link you provided is invalid`)
	const { mediafire } = require('../lib/_mediaDL.js')
	const baby1 = await mediafire(text)
	if (baby1[0].size.split('MB')[0] >= 100) {
    await connect('❌');
    return m.reply('Thhe file is too big sorry...')
    const media_image = "https://graph.org/file/1cfd63c7e3a114e89c06c.jpg";
   
	const result4 = `*MEDIAFIRE DOWNLOADER*

*❖ Name* : ${baby1[0].nama}
*❖ Size* : ${baby1[0].size}
*❖ Mime* : ${baby1[0].mime}
*❖ Link* : ${baby1[0].link}`
vorterx.sendMessage(m.chat,{ image: { url: media_image } {caption: result4},{document : { url : baby1[0].link}, fileName : baby1[0].nama, mimetype: baby1[0].mime }, { quoted : m })
}
    
      } catch (error) {
      console.error(error);
      m.reply('An error occurred while downloading the file.');
    }
  },
};
