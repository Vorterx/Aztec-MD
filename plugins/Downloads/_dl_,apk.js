const axios = require('axios');
const fs = require('fs');
const { search, download } = require('aptoid-scrapper');
const { Zenith } = require('../../lib/functions');

Zenith({
  usage: 'apk',
  desc: 'To search and download apks',
  category: 'Downloads',
}, async (vorterx, m, react, { args, quoted, mime }) => {
  
  if (!args) {
    await react('❌');
    return m.reply('Please provide an app name');
  }

  await react('📤');
  let data = await search(args);
  console.log(data);
  data = data.sort(() => Math.random() - 0.5);
  const { dllink, icon, name, lastup, package } = data[0];

  const caption = `
    *_Name_*: ${name}
    *_Package_*: ${package}
    *_Updated_*: ${lastup}
  `;

  vorterx.sendMessage(m.chat, { image: { url: icon }, caption });
  
  if (dllink) {

    const IS_STRING = Math.random().toString(36).substring(7);

    const filePath = `./${args}_${IS_STRING}.apk`;
    const fileName = `${args}_${IS_STRING}.apk`;

    axios.get(dllink, { responseType: 'stream' })
      .then(response => {
      const writer = fs.createWriteStream(filePath);
      response.data.pipe(writer);
        
          writer.on('finish', () => {
          let GET_APP = {
            document: fs.createReadStream(filePath),
            mimetype: 'application/vnd.android.package-archive',
            fileName: fileName,
            filePath: filePath,
          };

          vorterx.sendMessage(m.chat, GET_APP);
         });

        writer.on('error', (err) => {
        console.error(err);
      });
      })
      .catch(error => {
      console.error(error);
      });
   }
});
