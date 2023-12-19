/*
* @Author: DiegosonTech
* @BotName: Aztec-MD 
*/

const config = require('../../config.js');

module.exports = {
  name: "owner",
  description: "Get owner information",
  category: "Mics",
  async client(vorterx, m, { connect }) {
   
    await connect('👤');
    const userNumber = config.mods;
    const ownerName = process.env.OWNER_NAME;
    const logo = "https://i.ibb.co/v47d4BL/IMG-20230429-WA0021.jpg";
    const source = `https://wa.me/${userNumber}`;

    const buttonMessage = {
      contacts: {
        displayName: ownerName,
        contacts: [
          {
            vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:${ownerName}\nORG:;\nTEL;type=CELL;type=VOICE;waid=${userNumber}:+${userNumber}\nEND:VCARD`
          }
        ],
      },
      contextInfo: {
        externalAdReply: {
          title: `${config.CAPTION}`,
          body: "CHAT BOT MD",
          thumbnailUrl: logo,
          thumbnail: logo,
          mediaType: 1,
          mediaUrl: "",
          sourceUrl: source,
        },
      },
    };

    await vorterx.sendMessage(m.from, buttonMessage, { quoted: m });
  },
};
