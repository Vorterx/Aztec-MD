/*
* @Recode: DiegosonTech
* @Author: Sam Pandey
* @BotName: Aztec-MD
*/

const { Sticker, createSticker, StickerTypes } = require("wa-sticker-formatter");
const config = require('../../config.js');
const { Zenith } = require ('../../lib/_cmd_sxntax.js');

Zenith(
  {
    pattern: "sticker",
    alias: ['s'],
    category: "Convert",
    filename: __filename,
 }, async (vorterx, coax, react, {args}) => {
            
       if (!coax.quoted) {
        await react('❌');
        return coax.reply(`_Reply to a vid or image_`);
       }
      let mime = coax.quoted.mtype
          var pack;
          var author;
          if (!args) {
                 anu = args.split("|");
                 pack = anu[0] !== "" ? anu[0] : coax.pushName + '';
                 author = anu[1] !== "" ? anu[1] : config.CAPTION;
             } else {
            pack = coax.pushName;
            author = "";
             }
           let media = await coax.quoted.download();
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
          return vorterx.sendMessage(coax.from, {sticker: buffer }, {quoted: coax });
         })

  //---------------------------------------------------------------------------

Zenith ( 
  {
  usage: 'attp',
  category: 'Convert',
  desc: 'attps',
  filename: __filename
  }, async (vorterx, coax, react, { args}) => {

    if (!args) {
      await react('❌');
      return coax.reply('Please provide a text e.g attp Vorterx...');
    }

    await react('✔️');
    vorterx.sendMessage(coax.from, {
      sticker: {
        url: `https://api.lolhuman.xyz/api/attp?apikey=GataDios&text=${args}`,
        packname: config.CAPTION
      }
    }, { quoted: coax });

  });
      
