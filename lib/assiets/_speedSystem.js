const fs = require("fs");

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
   const uploadSpeed = 100;
   return uploadSpeed;
}

module.exports = {
   getFileSizeInMB,
   getCpuSpeed,
   getUploadSpeed
};
