const { Zenith } = require ('../../lib/_cmd_sxntax.js');
const ytdl = require('ytdl-core');
const fs = require('fs');
const path = require('path');
const search = require('yt-search');

Zenith(
  {
  usage: 'song',
  category: 'Downloads',
  desc: 'To Download the song',
  filename: __filename
}, async (vorterx, coax, args, react) => {
  
  if (!args) {
    await react('❌');
    return coax.reply('Provide a song name, please...');
  }
  const vidS = await search(args);

  if (!vidS || !vidS.videos || vidS.videos.length === 0) {
    await react('❌');
    return coax.reply('__Sorry If youre GAY you cant get the song__...');
  }

  const videoId = vidS.videos[0].videoId;
  const videoD = await ytdl.getInfo(videoId);
  const thumbnail = videoD.videoDetails.thumbnails[0].url;
  const viewCount = videoD.videoDetails.viewCount;
  const uploaded = videoD.videoDetails.uploadDate;

  const downloadsPath = path.join(__dirname, 'downloads');
  if (!fs.existsSync(downloadsPath)) {
    fs.mkdirSync(downloadsPath);
  }
   await react('✔️');
  const audio = ytdl(videoId, { quality: 'highestaudio' });
  const filePath = path.join(downloadsPath, `${videoD.videoDetails.title}.mp3`);
  const writeStream = fs.createWriteStream(filePath);
  audio.pipe(writeStream);

  writeStream.on('finish', () => {
    const msg = `Downloaded: ${videoD.videoDetails.title}\nViews: ${viewCount}\nUploaded Date: ${uploaded}`;
    vorterx.sendMessage(coax.from, { text: msg, thumbnail: thumbnail, audio: fs.readFileSync(filePath), mimetype: 'audio/mp3' });
    fs.unlinkSync(filePath);
  });

  writeStream.on('error', (err) => {
    coax.reply(`${err.message}`);
  });
})
