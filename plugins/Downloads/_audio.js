const fs = require('fs');
const yts = require('yt-search');
const axios = require('axios');

module.exports = {
    name: 'song',
    category: 'Downloads',
    async client(vorterx, m, {  args, connect }) {
        if (!args) {
            await connect('❌');
            return m.reply("Provide a song name");
        }

        const search = args.trim();
        const { videos } = await yts(search);

        if (!videos || videos.length <= 0)
            return m.reply('Sorry, cannot be found');

        const apiKey = 'GataDios';
        const ytaNewAPIURL = `https://api.lolhuman.xyz/api/ytaudio?apikey=${apiKey}&url=${encodeURIComponent(videos[0].url)}`;

        try {
            const response = await axios.get(ytaNewAPIURL);
            const audioData = response.data.result;

            console.log('Audio Data:', audioData); // Log audio data for debugging

            if (audioData) {
                const mediaUrl = audioData.link.link;

                console.log('Media URL:', mediaUrl); // Log media URL for debugging

                vorterx.sendMessage(m.from, await axios.get(mediaUrl, { responseType: 'arraybuffer' }).then(res => res.data), 2, {
                    quoted: m,
                    contextInfo: {
                        externalAdReply: {
                            title: audioData.title.substr(0, 30),
                            mediaType: 2,
                            thumbnail: await fs.promises.readFile(audioData.thumbnail),
                            mediaUrl: mediaUrl,
                        },
                    },
                });
            } else {
                m.reply('Failed to fetch audio data.');
            }
        } catch (error) {
            console.error('Error fetching audio data:', error);
            m.reply('An error occurred while fetching audio data.');
        }
    }
};
