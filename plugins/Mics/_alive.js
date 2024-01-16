/*
* @Author: DiegosonTech
* @BotName: Aztec-MD 
*/

const fs = require("fs");
const { tiny } = require("@viper-x/fancytext");
const { Zenith } = require('../../lib/_cmd_sxntax.js');
const { getBuffer } = require('../../lib/_getBuffer.js');
const config = require('../../config.js');
const path = require('path');

Zenith(
  {
    usage: 'alive',
    alias: ['on'],
    desc: 'To check the bot alive or off',
    category: 'Mics',
  },
  async (vorterx, m, react) => {
   
    await react('🧘');
    const image = {
      url: "https://i.ibb.co/grM9VLh/091e4657090fdaa14cb3fb9f69cfa7e6.jpg",
      mimetype: "image/jpeg",
    };

    const configFile = path.join(__dirname, '../../lib/config.json');
    const configData = fs.readFileSync(configFile);
    const configJson = JSON.parse(configData);

    let aliveMsg = ` 
╭––『 *CHAT ON* 』 
┆ ${m.pushName}
╰–❖ __
╭–––––––––––––––༓ 
┆✑  *Alive now🌷*
╰–––––––––––––––༓ 
╭–– 『 *Bot Status* 』      
┆ *Name* : ${configJson.Bots[0].BotName || ''}
┆ *Owner* : ${configJson.Bots[0].Owner || ''}
┆ *Prefix* :  ${config.Prefix || ''}
┆ *Time* : ${new Date().toLocaleTimeString()}
╰–––––––––––––––༓\n\n*${config.CAPTION || ''}*
`;

    const messageOptions = {
      image: image,
      caption: tiny(aliveMsg),
      contextInfo: {
        forwardingScore: 999,
        isForwarded:true,
        externalAdReply: {
          title: `${config.CAPTION || ''}`,
          body: "",
          thumbnail: await getBuffer("https://i.ibb.co/grM9VLh/091e4657090fdaa14cb3fb9f69cfa7e6.jpg"),
          mediaType: 1,
          mediaUrl: "",
          sourceUrl: "",
          ShowAdAttribution: true,
        },
      },
    };

    await vorterx.sendMessage(m.chat, messageOptions, { quoted: m});
  }
);
      
