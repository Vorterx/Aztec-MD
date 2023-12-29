const config = require('../../config.js');
const { Zenith } = require('../../lib/_cmd_syntax.js');
const moment = require('moment-timezone');

Zenith(
  {
    usage: 'runtime',
    category: 'Owner',
    desc: 'For the owner time',
    filename: _filename
  },
  async (vorterx, coax, isDev, args, react) => {
   
    if (!isDev) {
      await react('❌');
      return coax.reply('This command is for my Dev only');
    }
     await react('⌚');
    const userTime = 'Africa/Johannesburg';
    const time2 = moment().tz(userTime).format('HH:mm:ss');
    let aztec;

    if (time2 < '23:59:00') {
aztec = 'Good Night 🌌';
    }
      else if (time2 < '19:00:00') {
  aztec = 'Good Evening 🌃';
    } 
       else if (time2 < '18:00:00') {
aztec = 'Good Evening 🌃';
    } 
      else if (time2 < '15:00:00') {
  aztec = 'Good Afternoon 🌅';
    } 
        else if (time2 < '11:00:00') {
   aztec = 'Good Morning 🌄';
    }  
        else if (time2 < '05:00:00') {
 aztec = 'Good Morning 🌄';
    }

    const time = moment.tz(userTime).format('HH:mm:ss');
    const date = moment.tz(userTime).format('DD/MM/YYYY');

    const res = `
╭–– 『 *RUN TIME* 』
┆ ${aztec}
┆ *⏳Runtime:* ${runtime}
┆ *⏱️Time:* ${time}
┆ *⌚Date:* ${date}
╰–––––––––––––––༓\n\n*${config.CAPTION}*`;

    coax.reply(res);
  }
);
                        
