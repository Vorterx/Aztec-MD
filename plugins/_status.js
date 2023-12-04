const speed = require('performance-now');

module.exports = {
  name: 'status',
  alias: ['sx'],
  category: 'Mics',
  async client(vorterx, m, { text, args, connect }) {
    
    await connect('🤖');
    const uptime = process.uptime();
    const startTime = Date.now();
    const version = '3.0.0';
    const owner = process.env.OWNER_NAME;
    const additionalInfo = 'Just do what is the best: time 🏇';

    const AmarokBot = `
*〄_Description:* WhatsApp Chatbot made by Diegoson.
*〄_Speed:* Calculating...
*〄_Uptime:* Calculating...
*〄_Version:* ${version}
*〄_Owner:* ${owner}
*〄_Additional Info:* ${additionalInfo}`;

    const messageOptions = {
      contentText: AmarokBot,
      footerText: 'Bot Status',
      image: {
        url: 'https://i.ibb.co/s3LzSFJ/931684-7660.jpg'
      }
    };

    const sentMessage = await vorterx.sendMessage(m.from, messageOptions, 'textMessage');

    const endTime = Date.now();
    const latency = endTime - startTime;
    const uptimeText = getUptimeText(uptime);

    const AztecBot = `
*〄_Description:* WhatsApp Chatbot made by Diegoson.
*〄_Speed:* ${latency} ms
*〄_Uptime:* ${uptimeText}
*〄_Version:* ${version}
*〄_Owner:* ${owner}
*〄_Additional Info:* ${additionalInfo}`;

    const updatedMessageOptions = {
      contentText: AztecBot,
      footerText: 'Bot Status',
    };

    await vorterx.updateMessage(sentMessage.key.remoteJid, sentMessage.key.id, updatedMessageOptions, 'extendedTextMessage');
  },
};

function getUptimeText(uptime) {
  const hours = Math.floor(uptime / 3600);
  const minutes = Math.floor((uptime % 3600) / 60);
  const seconds = Math.floor(uptime % 60);
  return `${hours}h ${minutes}m ${seconds}s`;
  }
