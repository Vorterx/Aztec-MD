/*
* @Author: DiegosonTech
* @BotName: Aztec-MD
*/

const os = require('os');
const speed = require('performance-now');
const { tiny } = require('@viper-x/fancytext');
const config = require('../../config.js');
const { getBuffer } = require('../../lib/_getBuffer.js');
const { Zenith } = require('../../lib/_cmd_sxntax.js');

Zenith(
   {
   usage: 'status',
   category: 'Mics',
   desc: 'Check the status',
   filename: __filename
   }, async (vorterx, m, react ) => {
         
    const getUptimeText = (uptime) => {
      const hours = Math.floor(uptime / 3600);
      const minutes = Math.floor((uptime % 3600) / 60);
      const seconds = Math.floor(uptime % 60);
      return `${hours}h ${minutes}m ${seconds}s`;
    };

    await react('🤖');

    const uptime = process.uptime();
    const startTime = Date.now();
    const version = '3.0.0';
    const additionalInfo = 'Just do what is the best:';
    
    const ram = `${(os.totalmem() / 1e9).toFixed(2)}GB`;
    const endTime = Date.now();
    const latency = endTime - startTime;
    const uptimeText = getUptimeText(uptime);

    const AztecBot = `
*〄_Description:* WhatsApp Chatbot.
*〄_Speed:* ${latency} ms
*〄_Uptime:* ${uptimeText}
*〄_Version:* ${version}
*〄_RAM:* \`${ram}\`
*〄_Addit-Info:* ${additionalInfo}\n\n*${config.CAPTION}*`;

    const getStatus = {
      image: { url: 'https://i.ibb.co/s3LzSFJ/931684-7660.jpg' },
      caption: tiny(AztecBot),
      contextInfo: {
        forwardingScore: 999,
        isForwarded:true,
        externalAdReply: {
          title: `${config.CAPTION}`,
          body: "vorterx",
          thumbnail: await getBuffer("https://i.ibb.co/s3LzSFJ/931684-7660.jpg"),
          mediaType: 1, 
          mediaUrl: '',
          sourceUrl: '',
          ShowAdAttribution: true,
        },
      },
    };

    await vorterx.sendMessage(m.chat, getStatus, { quoted: m });
  });                    
