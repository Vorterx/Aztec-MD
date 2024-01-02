const config = require('../../config.js');
const { Zenith, getBuffer } = require('../../lib/functions.js');
const moment = require('moment-timezone');

Zenith(
  {
    usage: 'runtime',
    category: 'Owner',
    desc: 'For the owner time',
    filename: __filename
  },
  async (vorterx, coax, react, { isDev, args }) => {
    if (!isDev) {
      await react('❌');
      return coax.reply('This command is for my Dev only');
    }

    await react('⌚');
    const userTime = 'Africa/Johannesburg';
    const time = moment().tz(userTime);
    let aztec;

    if (time.isBetween(moment().set('hour', 0).set('minute', 0), moment().set('hour', 11).set('minute', 59))) {
      aztec = 'Good Morning 🌄';
    } else if (time.isBetween(moment().set('hour', 12).set('minute', 0), moment().set('hour', 16).set('minute', 59))) {
      aztec = 'Good Afternoon 🌅';
    } else {
      aztec = 'Good Night 🌌';
    }

    const formattedTime = time.format('HH:mm:ss');
    const date = time.format('DD/MM/YYYY');

    const res = `
╭–– *『 RUN TIME 』*
┆ *${aztec}*
┆ *⏳Owner:* ${process.env.MODS}
┆ *⏱️Time:* ${formattedTime}
┆ *⌚Date:* ${date}
╰–––––––––––––––༓\n\n*${config.CAPTION}*`;

    const context = {
      contextInfo: {
        caption: res,
        mentionedJid: [coax.sender],
        forwardingScore: 23,
        isForwarded: true,
        externalAdReply: {
          title: `${config.CAPTION}`,
          body: 'runtime',
          thumbnail: await getBuffer('https://i.imgur.com/Umf9Bio.jpg'),
          renderLargerThumbnail: true,
          mediaType: 2, 
          mediaUrl: '',
          sourceUrl: '',
          ShowAdAttribution: true,
        },
      },
    };

    vorterx.sendMessage(coax.from, context);
  }
);
