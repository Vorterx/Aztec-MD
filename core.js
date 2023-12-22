const { MongoClient } = require('mongodb');
const { DisconnectReason, makeInMemoryStore, makeCacheableSignalKeyStore, useMultiFileAuthState, fetchLatestBaileysVersion, makeWASocket, makeMongoStore, useMongoDBAuthState } = require('@iamrony777/baileys');
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
const { MessageHandler, vorterx } = require('./lib/client.js');

const app = express();
const PORT = process.env.PORT;

if (!process.env.MONGODB) {
  console.error("Mongodb URL has not been provided yet...");
  process.exit(1);
}

async function connectToMongoDB() {
  const mongo = new MongoClient(process.env.MONGODB, {
    socketTimeoutMS: 100000,
    connectTimeoutMS: 100000,
    waitQueueTimeoutMS: 100000,
  });

  await mongo.connect();
  return mongo;
}

async function startAztec() {
  if (!process.env.MONGODB) {
    console.error("Mongodb URL has not been provided yet...");
    process.exit(1);
  }

  const session = './connects/session/creds.json';
  if (!fs.existsSync(session)) {
    console.error("creds.json file not found. Please provide creds json");
    process.exit(1);
  }

  const mongo = await connectToMongoDB();
  const authC = mongo.db().collection("auth");
  const { state: mongoState, saveCreds: saveMongoCreds } = await useMongoDBAuthState(authC);

  const store = makeInMemoryStore({ logger: P().child({ level: 'silent' }) });
  const { state, saveCreds } = await useMultiFileAuthState(__dirname + '/auth_info_baileys/');

  const vorterx = makeWASocket({
    version: (await fetchLatestBaileysVersion()).version,
    auth: {
      creds: state.creds,
      keys: makeCacheableSignalKeyStore(state.keys),
    },
    logger: P({ level: "silent" }),
    printQRInTerminal: true,
  });

  store.bind(vorterx.ev);
  vorterx.cmd = new Collection();
  vorterx.contactDB = new QuickDB().table('contacts');
  vorterx.contact = contact;

  async function readcommands() {
    const cmdfile = fs.readdirSync("./plugins").filter((file) => file.endsWith(".js"));
    for (const file of cmdfile) {
      const command = require(`./plugins/${file}`);
      vorterx.cmd.set(command.name, command);
    }
  }

  await readcommands();

  vorterx.ev.on('creds.update', async () => {
    await saveCreds();
  });

  vorterx.ev.on('connection.update', async (update) => {
    const { connection, lastDisconnect } = update;

    if (connection === "close") {
      let reason = new Boom(lastDisconnect?.error)?.output.statusCode;
      switch (reason) {
        case DisconnectReason.connectionClosed:
          console.log("[🐲AZTEC] Connection closed, reconnecting.");
          startAztec();
          break;

        case DisconnectReason.connectionLost:
          console.log("[🐏AZTEC] Connection Lost from Server, reconnecting.");
          startAztec();
          break;

        case DisconnectReason.loggedOut:
          console.log("[😭AZTEC] Device Logged Out, Please Delete Session and Scan Again.");
          process.exit();
          break;

        case DisconnectReason.restartRequired:
          console.log("[♻️AZTEC] Server starting.");
          startAztec();
          break;

        case DisconnectReason.timedOut:
          console.log("[🎰AZTEC] Connection Timed Out, Trying to Reconnect.");
          startAztec();
          break;

        default:
          console.log("[🌬AZTEC] Server Disconnected: Maybe Your WhatsApp Account got banned");
      }
    }

    if (connection === "open") {
      console.log('Plugins loaded♻️');
      console.log('WhatsApp chatbot has connected✔️');
      const toxic = `🎉Vorterx is now online and buzzing with energy! 🚀`;
      vorterx.sendMessage(vorterx.user.id, { text: toxic });
      
      await saveCreds();
    }
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  vorterx.ev.on('messages.upsert', async (messages) => await MessageHandler(messages, vorterx));
  vorterx.ev.on('contacts.update', async (update) => await contact.saveContacts(update, vorterx));
}

startAztec();    
