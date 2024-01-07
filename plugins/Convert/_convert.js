/*
* @Recode: DiegosonTech
* @Author: Sam Pandey
* @BotName: Aztec-MD
*/

const { Sticker, createSticker, StickerTypes } = require("wa-sticker-formatter");
const config = require('../../config.js');
const { Zenith } = require('../../lib/_cmd_sxntax.js');

Zenith(
  {
    pattern: "sticker",
    alias: ['take','steal'],
    category: "Convert",
    filename: __filename
 }, async (vorterx, m, react, {args}) => {
            
       if (!m.quoted) {
        await react('❌');
        return m.reply(`_Reply to a vid or image_`);
       }
      let mime = m.quoted.mtype
          var pack;
          var author;
          if (!args) {
                 anu = args.split("|");
                 pack = anu[0] !== "" ? anu[0] : m.pushName + '';
                 author = anu[1] !== "" ? anu[1] : config.CAPTION;
             } else {
            pack = m.pushName;
            author = "";
             }
           let media = await m.quoted.download();
           let sticker = new Sticker(media, {
                    pack: pack, 
                    author: author, 
                    type: args.includes("--crop" || '-c') ? StickerTypes.CROPPED : StickerTypes.FULL,
                    categories: ["🤩", "🎉"], 
                    id: "12345", 
                    quality: 75,
                    background: "transparent",
                });
                const buffer = await sticker.toBuffer();
          return vorterx.sendMessage(m.chat, {sticker: buffer }, {quoted: m });
         });

  //---------------------------------------------------------------------------

Zenith ( 
  {
  usage: 'attp',
  category: 'Convert',
  desc: 'attps',
  filename: __filename
  }, async (vorterx, m, react, { args}) => {

    if (!args) {
      await react('❌');
      return m.reply('Please provide a text e.g attp Vorterx...');
    }

    await react('✔️');
    vorterx.sendMessage(m.chat, {
      sticker: {
        url: `https://api.lolhuman.xyz/api/attp?apikey=GataDios&text=${args}`,
        packname: config.CAPTION
      }
    }, { quoted: m });

  });
      
