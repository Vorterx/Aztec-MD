const YT = require("../lib/YTModule.js");
const fs = require('fs');
const yts = require('yt-search');

module.exports = {
    name: 'song',
    category: 'Downloads',
    async client(vorterx, m, { text, args, connect }) {

        if (!text) { 
          await connect('❌');
         return m.reply("Provide a song name");
        }
        const search = text.trim();
        const { videos } = await yts(search);
        if (!videos || videos.length <= 0)
            return m.reply('Sorry, cannot be found');

        const audio = new YT(videos[0].url, "audio");

        if (!audio.url) return;
        vorterx.sendMessage(m.from, await audio.getBuffer(), 2, {
            quoted: m,
            contextInfo: {
                externalAdReply: {
                    title: videos[0].title.substr(0, 30),
                    mediaType: 2,
                    thumbnail: await fs.promises.readFile(`https://i.ytimg.com/vi/${audio.id}/hqdefault.jpg`),
                    mediaUrl: audio.url,
                },
            },
        })
        .catch(reason =>
        m.reply(`An error occurred.`)
        ); }
     };
