//
const ytdl = require('ytdl-core');
const fs = require('fs');

module.exports = {
  name: 'video',
  alias: ['mp4'],
  category: 'Downloads',
  description: 'To download any videos you desire.',
  async client(vorterx, m, args) {
    const text = args.join(' ');
    if (!text) {
      return m.reply('_Please provide a video name._');
    }
    try {
      m.reply('Downloading your video, please wait...');
      const searchResults = await ytdl.search(text);
      if (searchResults.length === 0) {
        return m.reply('_No video found, sorry._');
      }
      const videoUrl = searchResults[0].url;
      const videoInfo = await ytdl.getInfo(videoUrl);
      const format = ytdl.chooseFormat(videoInfo.formats, {
        quality: 'highest',
        filter: 'video',
      });
      const videoReadableStream = ytdl(videoUrl, {
        quality: format.quality,
      });
      const filename = `${Date.now()}.mp4`;
      const videoWriteableStream = fs.createWriteStream(filename);
      videoReadableStream.pipe(videoWriteableStream);
      videoWriteableStream.on('finish', () => {
        const toxic_Cyber = `╭─〄
│ 🎧 TITLE: ${videoInfo.title}
├ 🆔 VID ID: ${videoInfo.video_id}
├ 🗓️ PUBLISHED: ${videoInfo.published}
├ ⏰ UPLOADED: ${videoInfo.uploaded}
│ 🥊 SIZE: ${videoInfo.size}
├─🔗 QUALITY: ${format.quality_label}
│
╰─────────*`;
        vorterx.sendMessage(m.from, {
          url: `file://${filename}`,
          caption: toxic_Cyber,
          mimetype: 'video/mp4',
        });
      });
    } catch (error) {
      console.error('Error downloading the video:', error);
      m.reply('_Error downloading the video._');
    }
  },
};
