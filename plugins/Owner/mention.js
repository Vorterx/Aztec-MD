const { Zenith,
       getBuffer, 
       toAudio
      } = require("../../lib/functions");

const logo = 'https://i.imgur.com/kKipXbb.jpeg';
const audios = ["https://i.imgur.com/BYHxsQb.mp4", "https://i.imgur.com/0BYmNbz.mp4"];
Zenith({ on: "text", isOwner: 'public', desc: "mention audio" }, async (vorterx, coax, react) => {
    const audio = audios[Math.floor(Math.random() * audios.length)];

    try {
        const Audio = await getBuffer(audio);
        const res = await toAudio(Audio, 'mp4');
        const coolWaveform = [00, 99, 00, 99, 00, 99, 00];
        console.log('\x1b[36m%s\x1b[0m', 'audio experience...');
        return await vorterx.sendMessage(coax.from, {
            audio: res,
            mimetype: 'audio/mpeg',
            ptt: true,
            waveform: coolWaveform,
            contextInfo: {
                mention: [coax.sender],
                forwardingScore: 12,
                isForwarded: true,
                externalAdReply: {
                    title: "⇆ㅤ ||◁ㅤ❚❚ㅤ▷||ㅤ ⇆",
                    body: "01:43 ━━━━●───── 03:50",
                    renderLargerThumbnail: false,
                    thumbnail: await getBuffer(logo),
                    mediaType: 1,
                    mediaUrl: 'https://www.instagram.com/reel',
                    sourceUrl: "https://www.instagram.com/reel",
                    showAdAttribution: true,
                }
            },
        }, { quoted: coax });
    } catch (error) {
       console.error('\x1b[31m%s\x1b[0m', '🚨 Error:', error);
        return coax.reply(error);
    }
});
