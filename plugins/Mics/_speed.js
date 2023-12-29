/*
* @Author: DiegosonTech
* @BotName: Aztec-MD 
*/

const { getCpuSpeed, getUploadSpeed, calculatePing } = require("../../lib/assiets/_speedSystem.js");
const os = require("os");
const speed = require("performance-now");
const { exec } = require("child_process");

Zenith(
   {
   usage: 'ping',
   category: 'Mics',
   desc: 'Check the speedy',
   filename: __filename
   }, async (vorterx, coax, react ) => {
     
      await react("🏇");
      const cpuSpeedResult = { speed: getCpuSpeed() }; 
      const uploadSpeedInMbps = getUploadSpeed(); 

      const startTimestamp = speed();
      exec(`neofetch --stdout`, (error, stdout, stderr) => {
         const endTimestamp = speed();
         const latency = endTimestamp - startTimestamp;

         const child = stdout.toString("utf-8");
         const aztec = child.replace(/Memory:/, "Ram:");
         
         coax.reply(`${aztec}*🛑 Performance:* ${latency.toFixed(4)} ms
*💻 CPU Speed:* ${cpuSpeedResult.speed} GHz
*📤 Upload Speed:* ${uploadSpeedInMbps} Mbps
*📍 Ping:* ${calculatePing(m.messageTimestamp, Date.now())} _second(s)_`);
      });
   });
