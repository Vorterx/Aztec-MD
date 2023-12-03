const { default: makeWASocket, DisconnectReason, Browsers, delay, fetchLatestBaileysVersion, makeInMemoryStore, useMultiFileAuthState } = require('@whiskeysockets/baileys');
const { Boom } = require('@hapi/boom');
const P = require('pino');
const express = require('express');
const { QuickDB } = require('quick.db');
const fs = require("fs");
const { Collection } = require('discord.js');
const config = require('./config.js');
const botName = config.botName;
const qr = require("qr-image");
const contact = require('./connects/contact.js');
const MessageHandler = require('./lib/message/vorterx.js');
let cc = config.session_Id.replace(/Vorterx;;;/g, "");

const app = express();
const PORT = 3000; 
async function startAztec() {
  const store = makeInMemoryStore({ logger: P().child({ level: 'silent', stream: 'store' }) });
async function MakeSession() {
    if (!fs.existsSync(__dirname + '/auth_info_baileys/creds.json')) {
      if (cc.length < 30) {
        const axios = require('axios');
        let { data } = await axios.get('https://paste.c-net.org/' + cc);
        await fs.writeFileSync(__dirname + '/auth_info_baileys/creds.json', atob(data), "utf8");
      } else {
        var c = atob(cc);
        await fs.writeFileSync(__dirname + '/auth_info_baileys/creds.json', c, "utf8");
      }}}
      await MakeSession();
      async function main() {
    if (!fs.existsSync(__dirname + '/auth_info_baileys/creds.json')) {
 }
const { state, saveCreds } = await useMultiFileAuthState(__dirname + '/auth_info_baileys/');

        
