const { YTM3 } = require('../../lib/YTM3.js');
const { Zenith } = require('../../lib/');
const ytdl = require('ytdl-core');

Zenith(
  {
    usage: 'song',
    category: 'Downloads',
    desc: 'Downloads and sends the requested song',
    filename: __filename,
  },
 async (vorterx, coax, args, react) => {
   
    if (!args) {
      await react('❌');
      return coax.reply('__Please provide a song name__.');
    }

    const Query = args;
    YTM3.searchMusic(Query, async (err, results) => {
      if (err) {
        console.error(err);
        await react('❌');
        return coax.reply('__Error searching for music...');
      }

      if (results.length === 0) {
        await react('❌');
        return coax.reply(`__No results found for '${Query}'.`);
      }
      const gotQuery = results[0];
      const stream = ytdl(gotQuery.url, { filter: 'audioonly' });
      vorterx.sendMessage(coax.from, { file: stream, name: `${gotQuery.title}.mp3` });
      await react('✅');
      return coax.reply(`_Downloading:'${gotQuery.title}'.`);
    });
  }
);
    
