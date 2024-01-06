const { Zenith } = require('../../lib/_cmd_sxntax.js');

Zenith(
  {
  usage: 'uptime',
  category: 'Mics',
  filename: __filename
}, async (vorterx, m, react) => {
 
  await react('⏲️');
  const uptime = process.uptime();
  const uptimeString = formatUptime(uptime);
  m.reply(`*Uptime*: ${uptimeString}`);
});

function formatUptime(seconds) {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const formattedUptime = `${days}d ${hours}h ${minutes}m`;
  return formattedUptime;
 }
