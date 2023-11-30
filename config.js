//-------------------------------------------------------------------------
//           COPYRIGHT MIT
//            2023 @DIEGOSONTECH
//-------------------------------------------------------------------------
//                     |
//                     |
//                     |
//                     -----------------------------------------------------

const fs = require('fs');
require('dotenv').config();
const chalk = require('chalk');

let config = {
  botName: process.env.BOTNAME || 'AZTEC MD',
  prefix: process.env.PREFIX || '.',
  name: process.env.OWNER_NAME || '', //Add your name here as its required
  owner_number: process.env.OWNER_NUMBER || '27686881509',
  session_Id: process.env.SESSION_ID || 'add something',
  level_up: process.env.LEVEL_UP || '', // Set true or false or enable/disable
  menu: process.env.MENU || '', // 2 is the default menu Aztec, 0 is Suhail MD menu
  thumb: process.env.THUMB || 'https://imageupload.io/69vJBZbn4iPqWTZ',
  auto_react: process.env.AUTO_REACT || 'off', // else {on} to react
  auto_read_status: process.env.AUTO_READ_STATUS || 'true', //else false
  worktype: process.env.WORKTYPE || "", //public or private 
  mods: process.env.MODS ? process.env.MODS.split(',') : [],
  LANG: process.env.LANG || 'VOR_TERX',
};

config.HEROKU = {
  API_KEY: process.env.HEROKU_API_KEY || '',
  APP_NAME: process.env.HEROKU_APP_NAME || '',
};

module.exports = config;

const configFile = require.resolve(__filename);
watchAndReloadConfig(configFile);

function watchAndReloadConfig(filePath) {
  fs.watchFile(filePath, () => {
  console.log(chalk.redBright(`Configuration file '${filePath}' updated`));
  delete require.cache[filePath];
  config = require(filePath);
  });
}

process.on('SIGINT', () => {
console.log(chalk.yellowBright('📴 Gracefully shutting down...'));
process.exit();
});
