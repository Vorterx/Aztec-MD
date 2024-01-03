const moment = require("moment");
const fs = require("fs");
const os = require("os");
const si = require('systeminformation');

function calculatePing(timestamp, now) {
    return moment.duration(now - moment(timestamp * 1000)).asSeconds();
}

function getFileSizeInMB(filePath) {
   const stats = fs.statSync(filePath);
   const fileSizeInBytes = stats.size;
   const fileSizeInMB = fileSizeInBytes / (1024 * 1024);
   return fileSizeInMB.toFixed(2);
}

function getCpuSpeed() {
   const cpus = os.cpus();
   const cpu = cpus[0];
   return cpu.speed.toFixed(2);
}

function getUploadSpeed() {
   const uploadSpeed = 50000;
   return uploadSpeed;
}

function getCPUSpeedDescription(cpuSpeed) {
   if (cpuSpeed > 3.5) {
      return "High Performance";
   } else if (cpuSpeed > 2.0) {
      return "Medium Performance";
   } else {
      return "Low Performance";
   }
}

async function getSystemInfo() {
   const systemData = await si.system();
   return `${systemData.manufacturer} ${systemData.model}`;
}

function getOSInfo() {
   return `${os.type()} ${os.release()}`;
}

async function getAdditionalSystemInfo() {
   const memoryData = await si.mem();
   return `Memory: ${Math.round(memoryData.total / (1024 * 1024 * 1024))} GB`;
}

async function getNetworkInfo() {
   const networkData = await si.networkStats();
   return `Network Usage: ${Math.round(networkData[0].rx_sec / 1024)} KB/s`;
}

async function getStorageInfo() {
   const storageData = await si.fsSize();
   const mainDrive = storageData.find(drive => drive.mount === '/');
   return `Storage: ${Math.round(mainDrive.size / (1024 * 1024 * 1024))} GB`;
}

function getUploadSpeedDescription(uploadSpeed) {
   if (uploadSpeed > 50) {
      return "High Upload Speed";
   } else if (uploadSpeed > 10) {
      return "Medium Upload Speed";
   } else {
      return "Low Upload Speed";
   }
}

module.exports = {
    getFileSizeInMB,
    getCpuSpeed,
    getUploadSpeed,
    calculatePing,
    getUploadSpeedDescription,
    getCPUSpeedDescription,
    getStorageInfo,
    getNetworkInfo,
    getAdditionalSystemInfo,
    getOSInfo,
    getSystemInfo     
};   
