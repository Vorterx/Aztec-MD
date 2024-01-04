const { Zenith } = require ('../../lib/_cmd_sxntax.js');
const bocil = require('@bochilteam/scraper');
const { tiny } = require('@viper-x/fancytext');
const config = require('../../config.js');
const ytdl = require('ytdl-core');
const gis = require('g-i-s');
const axios = require('axios');

//........................................
function gisPromise(args) {
  return new Promise((resolve, reject) => {
    gis(args, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}

//...........................................

Zenith(
  {
  usage: 'gimage',
  alias: ['googleimg'],
  category: 'Downloads',
  desc: 'To Download with gimage',
  filename: __filename
  }, async (vorterx, m, react, {args}) => {
    
    if (!args) {
      await react('❌');
      return m.reply('Please provide an image name...');
    }
    await react('✔️');

    try {
      const search = await gisPromise(args);
      if (!search || search.length === 0) {
        await react('❌');
        return m.reply('_No images found for the given term...');
      }

      const random_img = search[Math.floor(Math.random() * search.length)].url;
      const res = {
        image: { url: random_img },
        caption: `*GIMAGE DOWNLD*\n\n*TERM*: ${args}\n\n*${config.CAPTION}*`
      };

      vorterx.sendMessage(m.chat, res, { quoted: m });
    } catch (error) {
      console.error(error);
      await react('❌');
      return m.reply('An error occurred while fetching images...');
    }
  });

//---------------------------------------------------------------------------                                                                                   
//---------------------------------------------------------------------------                                

Zenith(
  {
  usage: "xnxxdn",
  desc: "Download XNXX videos",
  category: "Downloads",
  filename: __filename
  }, async (vorterx, m, react, {args}) => {
   
   if (!args) {
      await react("❌");
      m.reply("*Missing XNXX link, please provide one.*");
      return;
    }

    let urlYt = args;
    if (!urlYt.startsWith("https")) {
      await react("❌");
      m.reply("*😏 Provide me with an XNXXVD link.*");
      return;
    }

    await react("🍑");
    const res = await axios(`https://raganork-network.vercel.app/api/xvideos/download?url=${args}`);
    const video = res.data;

    let ca_pe = `
*XNXX VIDEO DOWNLOAD*\n\n
*PUSSY*

*${config.CAPTION}*
`;

    let buttonMessage = {
      video: video,
      mimetype: "video/mp4",
      fileName: `vorterx.mp4`,
      caption: tiny(ca_pe),
      gifPlayback: false,
      height: 496,
      width: 640,
      headerType: 1,
      messageOptions: {
        textColor: "#ffffff", 
        backgroundColor: "#000000", 
        footerTextColor: "#ffffff",
        footerBackgroundColor: "#333333",  
      },
    };

    return await vorterx.sendMessage(m.chat, buttonMessage, { quoted: m });
  });
