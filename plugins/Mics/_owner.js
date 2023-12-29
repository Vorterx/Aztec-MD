/*
* @Author: DiegosonTech
* @BotName: Aztec-MD 
*/

const config = require('../../config.js');
const { getBuffer } = require('../../lib/_getBuffer.js');

Zenith(
  {
  usage: "owner",
  desc: "Get owner information",
  category: "Mics",
  filename: __filename
  }, async (vorterx, coax, react) => {
   
    await react('👤');
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
          body: `${coax.pushName}`,
          thumbnail: await getBuffer("https://i.ibb.co/mCv3k97/original-e792fa6c963f76bc381b82ae539e68cc.png"),
          mediaType: 1, 
          mediaUrl: '',
          sourceUrl: source,
          forwardingScore: 999,
          isForwaded: true,
        },
      },
    };

    await vorterx.sendMessage(coax.from, buttonMessage, { quoted: coax });
  });
