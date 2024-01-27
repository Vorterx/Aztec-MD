const { Zenith } = require('../../lib/functions');
const yts = require('yt-search');
const ytdl = require('ytdl-core');
const config = require('../../config');

Zenith({ usage: 'ytv', 
        desc: 'Video downloader',
        category: 'Downloads' 
       }, async (vorterx,m,react,{args}) => {
  
  if (!args) {
    await react('❌');
  return m.reply('*_Provide a YouTube link_*');
  }
  await react('🏜️');
  const isUrl = ytdl.validateURL(args);
  const _IS_VID = ytdl(isUrl ? args : (await yts(args)).videos[0]?.url, { filter: 'audioandvideo', quality: 'highest' });

  const _EXT = [];
  _IS_VID.on('data', (chunk) => _EXT.push(chunk));
  _IS_VID.on('end', async () => {
    const _INFOR = Buffer.concat(_EXT);
    const get3RR = (e) => (console.error(e), m.reply('*_E3RR 404_*'));
    const _DETA = await yts({ videoId: ytdl.getURLVideoID(args) });

    const _INFO = `
 *Title:* ${_DETA.title}
 *Author:* ${_DETA.author.name}\n\n*${config.CAPTION}*
`;

    await vorterx.sendMessage(m.chat, { video: _INFOR, mimetype: 'video/mp4', caption: _INFO });
  } else {
    await react('❌');
    }
});
