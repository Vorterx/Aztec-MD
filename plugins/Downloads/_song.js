const ytdl = require('ytdl-core');
const fs = require('fs');
const path = require('path');
const search = require('yt-search');
//const { Zenith } = require('../../lib/client.js');

/*Zenith({
  usage: `${prefix}song`,
  alias: ['audio', 'mp3'],
  category: 'Downloads',
  desc: 'To download music',
  isOwner: false,
}).client = async (vorterx, m, { args, connect }) => {
*/
module.exports = {
  name: 'song',
  category: 'Downloads',
  async client(vorterx,m, { args, connect }) {
  
  if (!args) {
    await connect('❌');
    return m.reply('Provide a song name, please...');
  }
  const vidS = await search(args);

  if (!vidS || !vidS.videos || vidS.videos.length === 0) {
    await connect('❌');
    return m.reply('__Sorry If youre GAY you cant get the song__...');
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

  const audio = ytdl(videoId, { quality: 'highestaudio' });
  const filePath = path.join(downloadsPath, `${videoD.videoDetails.title}.mp3`);
  const writeStream = fs.createWriteStream(filePath);
  audio.pipe(writeStream);

  writeStream.on('finish', () => {
    connect('✅');
    const msg = `Downloaded: ${videoD.videoDetails.title}\nViews: ${viewCount}\nUploaded Date: ${uploaded}`;
    vorterx.sendMessage(m.from, { text: msg, thumbnail: thumbnail, audio: fs.readFileSync(filePath), mimetype: 'audio/mp3' });
    fs.unlinkSync(filePath);
  });

  writeStream.on('error', (err) => {
    m.reply(`${err.message}`);
  });
}
                               }
  
