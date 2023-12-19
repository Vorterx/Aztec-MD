const { connect } = require('../../lib/client.js'); 

const Textpro = {
  neon: "https://textpro.me/create-neon-light-text-effect-online-1000.html",
  neonlight: "https://textpro.me/create-3d-neon-light-text-effect-online-1028.html",
  neongreen: "https://textpro.me/green-neon-text-effect-874.html",
  dualtext: "https://textpro.me/create-3d-text-metal-logo-design-online-1042.html",
  summer: "https://textpro.me/create-sunset-light-text-effects-online-for-free-1124.html",
};

const fetchLogo = async (vorterx, m, logoName, text) => {
  if (!Textpro[logoName]) {
    await connect("❌");
    return m.reply("*Invalid logo name. Provide a valid command bruh ex neon vorterx*");
  }

  const getLogo = Textpro[logoName]; 

  await connect("🤡", "😍", "👺", "👥", "👄");
  const axios = require("axios");
  const { tiny } = require('@viper-x/fancytext');
  const maker = require('mumaker');

  const [text1, text2] = text.split("|");

  let anu = await maker.textpro(getLogo, `${text1} ${text2}`); 

  const aztec = `*Name*: ${logoName}\n\n*${config.CAPTION}*`;
  vorterx.sendMessage(m.from, { image: { url: anu.image }, caption: tiny(aztec) }, { quoted: m });
};

module.exports = {
  name: "logomaker",
  description: "TEXTPRO",
  category: "TEXTPRO LA",
  async client(vorterx, m, { text, args }) {
    const logoName = text.toLowerCase();
    if (logoName === "logomaker") {
      const Commands = Object.keys(Textpro).map((command, index) => `${index + 1} ${command}`).join("\n  ");
      return m.reply(`*[ LOGO MAKERS MENU ]*\n${Commands}`);
    }

    const [command, inputText] = logoName.split(" ", 2);
    await fetchLogo(vorterx, m, command, inputText);
  },
};
