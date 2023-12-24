const yts = require('yt-search');
const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');

module.exports = {
    name: 'song',
    category: 'Downloads',
    async client(vorterx, m, { args, connect }) {
        if (!args) {
            await connect('❌');
            return m.reply("Provide a song name");
        }

        try {
            const search = args.trim();
            const { videos } = await yts(search);

            if (!videos || videos.length <= 0)
                return m.reply('Sorry, cannot be found');

            const apiKey = 'GataDios';
            const ytaNewAPIURL = `https://api.lolhuman.xyz/api/ytaudio?apikey=${apiKey}&url=${encodeURIComponent(videos[0].url)}`;

            const response = await axios.get(ytaNewAPIURL);
            const audioData = response.data.result;

            if (audioData) {
                const mediaUrl = audioData.link.link;

                // Download audio to tmp folder
                const tmpFolderPath = path.join(__dirname, 'tmp');
                const tmpFilePath = path.join(tmpFolderPath, `audio_${Date.now()}.webm`);
                
                await fs.mkdir(tmpFolderPath, { recursive: true });
                const audioBuffer = await axios.get(mediaUrl, { responseType: 'arraybuffer' }).then(res => res.data);
                await fs.writeFile(tmpFilePath, audioBuffer);

                // Send the audio file
                vorterx.sendMessage(m.from, { audio: tmpFilePath, mimetype: 'audio/webm' }, 2, { quoted: m });
            } else {
                m.reply('Failed to fetch audio data.');
            }
        } catch (error) {
            console.error('Error fetching audio data:', error);
            m.reply('An error occurred while fetching audio data.');
        }
    }
};
