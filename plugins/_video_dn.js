const ytdl = require('ytdl-core');
const fs = require('fs');

module.exports = {
  name: 'video',
  alias: ['mp4'],
  category: 'Downloads',
  description: 'To download any videos u desire.',
  async xstart(vorterx, m, { text, args, mime, quoted, xReact }) {
    
    if (text === 'video') {
      await xReact('❌');
     return m.reply('_Please provide a video name._');
    }
  
    if (text.startsWith('video//')) {      
      const videoName = text.match(/video\/\/(.+)/i)[1];
      try {
        await xReact('📤')
        m.reply('Downloading your video, please wait...');
        const searchResults = await ytdl.search(videoName);
        if (searchResults.length === 0) {
         return m.reply('_No video found sorry._');
        }

        const videoUrl = searchResults[0].url;
        const videoInfo = await ytdl.getInfo(videoUrl);
        const highestQualityFormat = ytdl.chooseFormat(videoInfo.formats, {
          quality: 'highest',
          filter: 'video',
        });

        const videoStream = ytdl.downloadFromInfo(videoInfo, {
          format: highestQualityFormat,
        });
        const filename = `${Date.now()}.mp4`;
        videoStream.pipe(fs.createWriteStream(filename));
        const toxic_Cyber = `╭─〄\n
│ 🎧 TITLE: ${videoInfo.title}
├ 🆔 VID ID: ${videoInfo.video_id}
├ 🗓️  PUBLISHED: ${videoInfo.published}
├ ⏰ UPLOADED: ${videoInfo.uploaded}
│ 🥊  SIZE: ${videoInfo.size}
├─🔗 QUALITY: ${highestQualityFormat.quality_label}
│
╰─────────*`;
       vorterx.sendMessage(m.from, {url: `file://${filename}`, caption: toxic_Cyber, mimetype: 'video/mp4', });
      } catch (error) {
        console.error('Error downloading the video:', error);
        m.reply('_Error downloading the video._');
      } }
  },
};
