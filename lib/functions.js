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

const { commands, Zenith } = require(path.join(__dirname, '_cmd_sxntax'));
const { getTruth, getDare } = require(path.join(__dirname, 'getTruth_Dare'));

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
   participants
   
};
