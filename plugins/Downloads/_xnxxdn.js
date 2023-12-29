Zenith(
  {
  usage: "xnxxdn",
  desc: "Download XNXX videos",
  category: "Downloads",
  filename: __filename
  }, async (vorterx, coax, react, args) => {
   
    const axios = require("axios");
    const config = require('../../config.js');
    const { tiny } = require('@viper-x/fancytext');
    if (!args) {
      await react("❌");
      coax.reply("*Missing XNXX link, please provide one.*");
      return;
    }

    let urlYt = args;
    if (!urlYt.startsWith("https")) {
      await react("❌");
      coax.reply("*😏 Provide me with an XNXXVD link.*");
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

    return await vorterx.sendMessage(coax.from, buttonMessage, { quoted: coax });
  });
