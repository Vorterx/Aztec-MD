const { formatp, runtime } = require("../connects/myFunc.js");
const chalk = require("chalk");
const { bubble } = require("@viper-x/fancytext");
const os = require("os");
const now = require("performance-now");

module.exports = {
  name: "system",
  description: "To check the system status",
  category: "user",
  async client(vorterx, m, { connect, text }) {
    const latensi = now() - now();
    await connect("📟");

    let aztec = `*乂 SYSTEM - STATUS*\n\n`;
    aztec += `❲❒❳ *BotName :* ${process.env.BOTNAME}\n`;
    aztec += `❲❒❳ *Version :* 3.0.0\n`;
    aztec += `❲❒❳ *RAM :* _${formatp(os.totalmem() - os.freemem())}/${formatp(
      os.totalmem()
    )}_\n`;
    aztec += `❲❒❳ *Speed :* _${latensi.toFixed(4)}sec_*\n`;
    aztec += `❲❒❳ *Runtime :* _${runtime(process.uptime())}_\n`;
    aztec += `❲❒❳ *Platform :* ${os.platform()}\n`;
    aztec += `❲❒❳ *Platform ID :* ${os.hostname()}\n\n`;
    aztec += `*©vorterx-team*`;

    const formattedAztec = chalk.bold(aztec);

    const D3centX = [
      { name: "selectAztec 1", text: formattedAztec },
      { name: "selectAztec 2", text: formattedAztec },
      { name: "selectAztec 3", text: formattedAztec },
      { name: "selectAztec 4", text: bubble(aztec, "blue") },
      { name: "selectAztec 5", text: bubble(aztec, "green") },
      { name: "selectAztec 6", text: bubble(aztec, "purple") },
    ];

    const selectedAztec = D3centX[Math.floor(Math.random() * D3centX.length)];

    const img = `https://i.ibb.co/GnZ0J9K/IMG-20230723-WA0085.jpg`;
    vorterx.sendMessage(m.from, { image: { url: img }, caption: selectedAztec.text });
  },
};
