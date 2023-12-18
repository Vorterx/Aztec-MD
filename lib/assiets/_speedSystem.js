const moment = require("moment");
const fs = require("fs");
const os = require("os");

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

module.exports = {
   getFileSizeInMB,
   getCpuSpeed,
   getUploadSpeed,
   calculatePing
};   
