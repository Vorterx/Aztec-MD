const path = require('path');
const axios = require('axios');

const {
   args,
   text,
   react,
   mentionByTag,
   isAdmin,
   isBotAdmin,
   isDev,
   isMedia,
   mime,
   quoted,
   getCMD,
   gcMeta,
   gcName,
   groupMembers,
   groupAdmins,
   isCmd,
   botNumber,
   isOwner,
   participants
} = require('./client');

const {
   decodeJid,
   downloadMedia,
   serialize
} = require(path.join(__dirname, 'index'));
   

const { commands, Zenith } = require(path.join(__dirname, '_cmd_sxntax'));
const { getTruth, getDare } = require(path.join(__dirname, 'getTruth_Dare'));

const {
   getBinary,
   eBinary
} = require('./_getBinary');

const {
   getBuffer,
   isUrl
} = require('./_getBuffer');

const uploadToImgur = require(path.join(__dirname, '_imgur'));

module.exports = {
   args,
   text,
   react,
   mentionByTag,
   isAdmin,
   isBotAdmin,
   isDev,
   isMedia,
   mime,
   quoted,
   getCMD,
   commands,
   Zenith,
   getTruth,
   getDare,
   gcMeta,
   gcName,
   groupMembers,
   groupAdmins,
   isCmd,
   botNumber,
   isOwner,
   participants,
   decodeJid,
   downloadMedia,
   serialize,
   getBinary,
   eBinary,
   getBuffer,
   isUrl,
   uploadToImgur,
   toAudio,
   toVideo,
   toJson,
   toCSV,
   toXML,
   toLowerCase,
   toUpperCase,
   toBase64,
   toDate,
   toHex,
   toArray,
   toQueryString,
   toBoolean,
   toFloat,
   toInt,
   toRadians,
   toDegrees,
   toCamelCase,
   toSnakeCase,
   toKebabCase,
   toReverse                                     
};
