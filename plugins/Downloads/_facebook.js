const bocil = require('@bochilteam/scraper');
const { tiny } = require('@viper-x/fancytext');
const config = require('../config.js');

module.exports = {
    name: "fb",
    description: "To download Facebook",
    category: "Downloads",
    async client(vorterx, m, {
        connect, text, args
    }) {
       
        try {
            if (!text) {
                await connect("❌");
                return m.reply(`*Please Provide a Valid Facebook Video Link*`);
            } else {
                await connect("📤");
                bocil.facebookdlv2(`${text}`).then(async (data) => {

                    const { filesizeH, quality } = data.result[0];
                    let caption = `*Size* : ${filesizeH}\n*Quality* : ${quality}\n\n*${config.CAPTION}*`;
                    vorterx.sendMessage(m.from, {
                        video: {
                            url: data.result[0].url
                        },
                        caption: tiny(caption)
                    }, {
                        quoted: m
                    });
                });
            }
        } catch (error) {
            vorterx.sendMessage(m.from, {
                text: "Error occurred while processing"
            });
        }
    }
};
