/*
* @Author: DiegosonTech
* @BotName: Aztec-MD
*/

const osu = require('node-os-utils');
const { performance } = require('perf_hooks');
const config = require('../../config');
const { Zenith,getBuffer } = require('../../lib/_cmd_sxntax.js');

let NotDetect = 'Not Detect';
let old = performance.now();
let cpu = osu.cpu;
let cpuCore = cpu.count();
let drive = osu.drive;
let mem = osu.mem;
let OS = osu.os.platform();
let cpuModel = cpu.model();
let cpuPer;

Zenith({
  usage: 'status',
  category: 'Mics',
  desc: 'Check the status',
  filename: __filename
}, async (vorterx, m, react) => {

   await react('🌀');
  let p1 = cpu.usage().then(cpuPercentage => {
    cpuPer = cpuPercentage;
  }).catch(() => {
    cpuPer = NotDetect;
  });

  await p1;
  let netstat = [
    {
      inputMb: 100,
      outputMb: 50
    }
  ];

  const DUN = `*「 Status 」*
  *OS*: *${OS}*
  *CPU Model*: *${cpuModel}*
  *CPU Core*: *${cpuCore} Core*
  *CPU*: *${cpuPer}%*
  *Ram*: *${mem.usedMemMb} MB / ${mem.totalMemMb} MB (${Math.round(100 * (mem.usedMemMb / mem.totalMemMb))})*
  *Drive*: *${drive.usedGb} GB / ${drive.totalGb} GB (${Math.round(100 * (drive.usedGb / drive.totalGb))})*
  *Ping*: *${Math.round(performance.now() - old)} ms*
  `;
  vorterx.sendMessage(m.chat, {
    text: DUN,
    contextInfo: {
       forwardingScore: 5,
       isForwarded: true,
      externalAdReply: {
        title: `${config.CAPTION}`,
        mediaType: 1,
        renderLargerThumbnail: true,
        thumbnail: await getBuffer('https://i.ibb.co/s3LzSFJ/931684-7660.jpg'),
        sourceUrl: `${config.CHANNEL}`,
      }
    }
  });
});
   
