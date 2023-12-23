module.exports = {
  name: "xnxxdn",
  description: "Download XNXX videos",
  category: "Downloads",
  async client(vorterx, m, { connect, text, args }) {
   
    const axios = require("axios");
    const config = require('../../config.js');
    const { tiny } = require('@viper-x/fancytext');
    if (!text) {
      await connect("❌");
      m.reply("*Missing XNXX link, please provide one.*");
      return;
    }

    let urlYt = text;
    if (!urlYt.startsWith("https")) {
      await connect("❌");
      m.reply("*😏 Provide me with an XNXXVD link.*");
      return;
    }

    await connect("🍑");

    const res = await axios(`https://raganork-network.vercel.app/api/xvideos/download?url=${text}`);
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

    return await vorterx.sendMessage(m.from, buttonMessage, { quoted: m });
  },
};
