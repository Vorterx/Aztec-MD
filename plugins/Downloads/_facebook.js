const { Zenith } = require ('../../lib/_cmd_sxntax.js');
const bocil = require('@bochilteam/scraper');
const { tiny } = require('@viper-x/fancytext');
const config = require('../../config.js');

Zenith(
    {
    usage: "fb",
    desc: "To download Facebook",
    category: "Downloads",
    filename: __filename
    }, async (vorterx, coax, react, args) => {
       
        try {
            if (!args) {
                await react("❌");
                return coax.reply(`*Please Provide a Valid Facebook Video Link*`);
            } else {
                await react("📤");
                bocil.facebookdlv2(`${args}`).then(async (data) => {

                    const { filesizeH, quality } = data.result[0];
                    let caption = `*Quality* : ${quality}\n\n*${config.CAPTION}*`;
                    vorterx.sendMessage(coax.from, {
                        video: {
                            url: data.result[0].url
                        },
                        caption: tiny(caption)
                    }, {
                        quoted: coax
                    });
                });
            }
        } catch (error) {
            vorterx.sendMessage(coax.from, {
                text: "Error occurred while processing"
            });
        }
    });
