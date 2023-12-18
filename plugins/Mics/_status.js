const speed = require('performance-now');
const config = require('../../config.js');

module.exports = {
  name: 'status',
  alias: ['sx'],
  category: 'Mics',
  async client(vorterx, m, { text, args, connect }) {
    
    const getUptimeText = (uptime) => {
      const hours = Math.floor(uptime / 3600);
      const minutes = Math.floor((uptime % 3600) / 60);
      const seconds = Math.floor(uptime % 60);
      return `${hours}h ${minutes}m ${seconds}s`;
    };

    await connect('🤖');
    const uptime = process.uptime();
    const startTime = Date.now();
    const version = '3.0.0';
    const owner = process.env.OWNER_NAME;
    const additionalInfo = 'Just do what is the best:';
    const endTime = Date.now();
    const latency = endTime - startTime;
    const uptimeText = getUptimeText(uptime);

    const AztecBot = `
*〄_Description:* WhatsApp Chatbot.
*〄_Speed:* ${latency} ms
*〄_Uptime:* ${uptimeText}
*〄_Version:* ${version}
*〄_Owner:* ${owner}
*〄_Additional Info:* ${additionalInfo}\n\n*${config.CAPTION}*`;

    await vorterx.sendMessage(m.from, { 
      image: { url: 'https://i.ibb.co/s3LzSFJ/931684-7660.jpg' },
      caption: tiny(AztecBot)
    });
  },
};
