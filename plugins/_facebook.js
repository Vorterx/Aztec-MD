//-----------[F B D L D O W N]----

const bocil = require('@bochilteam/scraper');
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
                    m.reply(`\`\`\`Downloading your video, please wait...⏳\`\`\``);

                    let title = data.result[0].title || "N/A";
                    let size = data.result[0].size || "N/A";
                    let likes = data.result[0].likes || "N/A";

                    let caption = `╭–– 『*FB Downloader*』      
┆ *Title* : ${title}
┆ *Size* : ${size}
┆ *Quality* : ${data.result[0].quality}
┆ *Likes* : ${likes}
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
