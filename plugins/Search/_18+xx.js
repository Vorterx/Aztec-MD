const { Zenith } = require('../../lib/functions.js');
const axios = require('axios');
const config = require('../../config');

Zenith(
  {
    usage: "xnxx",
    desc: "18+ videos only",
    category: "Downloads",
  },
  async (vorterx, m, react, { args }) => {

    if (!args) {
      await react("❌");
      return m.reply("Please provide a search term.");
    }
    const 18XNXX = `https://raganork-network.vercel.app/api/xvideos/search?query=${args}`;

    try {
      await react('📤');
      const GET_RES = await axios.get(18XNXX);
      if (GET_RES.data && GET_RES.data.result) {
        const results = GET_RES.data.result;

        if (results.length > 0) {
          const header = "*VORTEX XXX DOWNLOADER*\n\n";
          let message = header;

          for (let i = 0; i < results.length; i++) {
            const PUSSY_INFO = results[i];
            if (PUSSY_INFO.age_limit === "18") {
              message += `*_VIDEO_* ${i + 1}\n*TITLE*: ${PUSSY_INFO.title}\n*LINK*: ${PUSSY_INFO.link}\n\n`;
            }
          }

          vorterx.sendMessage(m.chat, {text: message});
          vorterx.sendMessage(m.chat, {text: "_Please reply with the number to the list_"});
        } else {
          console.log("_No results found_");
        }
      } else {
        console.error("_E3RR_");
      }
    } catch (error) {
      console.error(error.message);
    }

    if (m.args) {
      const VARGS = m.args.toLowerCase();

      if (/^\d+$/.test(VARGA) && m.quoted) {
        const xuata = m.quoted.args.toLowerCase();

        if (xuata.includes("please reply to the number list")) {
          const NUM3 = VARGS;
          const _LEST_FUCK = `https://raganork-network.vercel.app/api/xvideos/download?url=${args}`;
          axios.get(_LEST_FUCK, { responseType: 'arraybuffer' })
            .then((Res) => {
              const caption = `*Puss3*\n*${config.CAPTION}*`;
              vorterx.sendMessage(m.sender, { video: Res.data, mimetype: "video/mp4", filename: `vorterx.mp4`, caption: caption });
            })
            .catch(E3RR) => {
              console.error(E3RR.message);
             m.reply("_AN E3RR OCCURRED SORRY NO MASTERBATING FOR YOU TODAY 😂😂😂_");
          
          });
        } else {
         m.reply('_Sorry invalid selection FOR PUSSY😂😂_');
        }
      }
    }
  }
);
