const bocil = require('@bochilteam/scraper');
module.exports = {
    name: "fb",
    description: "To download Facebook",
    category: "Downloads",
    async client(vorterx, m, {
        connect, adreply, text, args
    }) {
        try {
            if (!text) {
                await connect("⛔");
                return m.reply(`*Please Provide a Valid Facebook Video Link*`);
            } else {
                await connect("📺");
                bocil.facebookdlv2(`${text}`).then(async (data) => {

                    let caption = `╭–– 『 *FB Downloader』      
┆ *Title* : ${data.result[0].title}
┆ *Size* : ${data.result[0].size}
┆ *Quality* : ${data.result[0].quality}
┆ *Likes* : ${data.result[0].likes}
╰–––––––––––––––༓`;

                    vorterx.sendMessage(m.from, {
                        video: {
                            url: data.result[0].url
                        },
                        caption: caption
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
