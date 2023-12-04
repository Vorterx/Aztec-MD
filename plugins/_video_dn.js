const ytdl = require('sigma-md-ytdl');
const fs = require('fs');

module.exports = {
  name: 'video',
  alias: ['mp4'],
  category: 'Downloads',
  description: 'To download any videos you desire.',
  async client(vorterx, m, { text, args, mime, quoted, connect }) {
   
    if (text === 'video') {
      await connect('❌');
      return m.reply('_Please provide a video name._');
    }
    if (text.startsWith('video//')) {
      const getNam = text.match(/video\/\/(.+)/i)[1];
      try {
        await connect('📤');
        m.reply('Downloading your video, please wait...');
        const search = await ytdl.search(getNam);
        if (search.length === 0) {
          await connect('❌');
          return m.reply('_No video found, sorry._');
        }
        const Url = search[0].url;
        const Info = await ytdl.getInfo(Url);
        const qualityF = ytdl.chooseFormat(Info.formats, {
          quality: 'highest',
          filter: 'video',
        });

        const Stream = ytdl.downloadFromInfo(Info, {
          format: qualityF,
        });
        const filename = `${Date.now()}.mp4`;
        Stream.pipe(fs.createWriteStream(filename));
        const toxic_Cyber = `╭─〄\n
│ 🎧 TITLE: ${Info.title}
├ 🆔 VID ID: ${Info.video_id}
├ 🗓️ PUBLISHED: ${Info.published}
├ ⏰ UPLOADED: ${Info.uploaded}
│ 🥊 SIZE: ${Info.size}
├─🔗 QUALITY: ${qualityF.quality_label}
│
╰─────────*`;
        vorterx.sendMessage(m.from, { url: `file://${filename}`, caption: toxic_Cyber, mimetype: 'video/mp4', });
      } catch (error) {
        console.error('Error downloading the video:', error);
        m.reply('_Error downloading the video._');
      }
    }
  },
};
