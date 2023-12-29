/*
* @Author: DiegosonTech
* @BotName: Aztec-MD
* @MadeBy: Diegoson
*/

const fetch = async (url) => (await import('node-fetch')).default(url);
const config = require('../../config.js');

Zenith(
  {
  usage: 'bingimg',
  alias: ['binimg', 'bingimage'],
  category: 'GPT AI',
  desc: 'To download images from Bing',
  filename: __filename
  }, async (vorterx, coax, args, react, mime, quoted) => {

    if (!args) {
      await react('❌');
      return coax.reply('Please provide an image name, e.g., bingimg Goku...');
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
        coax.reply(`${res.status}`);
      }
      await react('⏲️');
      coax.reply(`\`\`\`Please wait a sec...⏳\`\`\``);
      const data = await res.json();
      console.log(data); 
     if (data && data.status && data.result) {
          const get_img = data.result;
       await vorterx.sendMessage(coax.from, {
          image: {
            url: get_img,
          },
             caption: `*Name*: ${args}\n\n*${config.CAPTION}*`,
           });
      } else {
          console.log('No image URL found in the query...'); 
        await react('❌');
        return coax.reply('No images found for the given args...');
      }
    } catch (error) {
      console.error(error.message || error);
      return coax.reply('Please try again later..');
    }
  });
      
