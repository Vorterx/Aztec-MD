/*const { Sticker, StickerTypes } = require('wa-sticker-formatter');
const { getBuffer } = require("../connects/myFunc.js");
const fs = require("fs");
let { downloadMedia } = require("../lib/message/D3centX.js");
const axios = require("axios");

module.exports = {
  name: 'steal',
  alias: ['take'],
  category: 'Converctor',
  description: 'Take the sticker to user name',
  async xstart(vorterx,m,{args,xReact,text}) {
   
  try {
     const author = 'vorterx';
     const owner = '';
      
      const content = JSON.stringify(m.quoted);
      const isQuotedSticker = (m.type === 'extendedTextMessage' && content.includes('stickerMessage'));

      if (isQuotedSticker)
        const pack = args.split(',');
        const buffer = isQuotedSticker ? await m.quoted.download() : await m.download();
        const sticker = new Sticker(buffer, {
          pack: author,
          author: owner,
          type: StickerTypes.FULL,
          categories: ['🤩', '🎉'],
          quality: 70
        });

        await vorterx.sendMessage(m.from,{sticker: await sticker.build()},{quoted: m});
      }
     } catch (err) {
      m.reply("An error occurred while processing");
     console.log(err);
    }}
   }*/
