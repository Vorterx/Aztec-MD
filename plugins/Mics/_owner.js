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
    const logo = "https://i.ibb.co/mCv3k97/original-e792fa6c963f76bc381b82ae539e68cc.png";
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
          body: `${m.pushName}`,
          thumbnail: { mediaType: 1, mediaUrl: 'https://i.ibb.co/s3LzSFJ/931684-7660.jpg' },
          sourceUrl: source,
          forwardingScore: 999,
          isForwaded: true,
        },
      },
    };

    await vorterx.sendMessage(m.from, buttonMessage, { quoted: m });
  },
};
