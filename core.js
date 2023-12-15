const { MongoClient } = require("mongodb");
const { DisconnectReason, makeInMemoryStore, useMultiFileAuthState, fetchLatestBaileysVersion, makeWASocket, makeMongoStore, useMongoDBAuthState, removeCreds } = require('@iamrony777/baileys');
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
const MessageHandler = require('./lib/client.js');

const app = express();
const PORT = process.env.PORT;

if (!process.env.MONGODB) {
  console.error("Mongodb URL has not been provided yet...");
  process.exit(1);
}

let authFilePath;

if (fs.existsSync("./auth_info_baileys/creds.json")) {
  authFilePath = "./auth_info_baileys/";
} else if (process.env.SESSION_ID) {
  authFilePath = process.env.SESSION_ID;
} else {
  console.error("Authentication file not found. Please provide either creds.json or SESSION_ID.");
  process.exit(1);
}

async function startAztec() {
  const inMemoryStore = makeInMemoryStore({ logger: P().child({ level: 'silent', stream: 'store' }) });
  const { state, saveCreds } = await useMultiFileAuthState(authFilePath);

  const mongo = new MongoClient(process.env.MONGODB, {
    socketTimeoutMS: 1_00_000,
    connectTimeoutMS: 1_00_000,
    waitQueueTimeoutMS: 1_00_000,
  });

  const authC = mongo.db(process.env.SESSION_ID).collection("auth");
  const { state: mongoState, saveCreds: saveMongoCreds } = await useMongoDBAuthState(authC);

  const mongoStore = makeMongoStore({
    filterChats: true,
    db: mongo.db(process.env.SESSION_ID),
    autoDeleteStatusMessage: true
  });

  const vorterx = makeWASocket({
    logger: P({ level: "silent" }),
    printQRInTerminal: process.env.SESSION_ID ? false,
    browser: ['Chrome (Linux)', '', ''],
    qrTimeoutMs: undefined,
    auth: mongoState,
    version: (await fetchLatestBaileysVersion()).version,
    store: mongoStore
  });

  if (mongoStore) {
    mongoStore.bind(vorterx.ev);
  } else {
    console.error("Error: 'mongoStore' is undefined. Please check your code.");
  }

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
    await saveMongoCreds();
  });

  vorterx.ev.on('connection.update', async (update) => {
    const { connection, lastDisconnect } = update;

    if (connection === "close") {
      let reason = new Boom(lastDisconnect?.error)?.output.statusCode;
      if (reason === DisconnectReason.connectionClosed || reason === DisconnectReason.connectionLost) {
        console.log("[🐏AZTEC] Connection closed or lost, reconnecting in 3000ms.");
        setTimeout(() => {
          connectWithRetry();
        }, 3000);
      } else if (reason === DisconnectReason.loggedOut) {
        console.log("[😭AZTEC] Device Logged Out, Cleaning up session.");
        await removeCreds();
        process.exit();
      } else if (reason === DisconnectReason.restartRequired) {
        console.log("[♻️AZTEC] Server starting.");
        connectWithRetry();
      } else if (reason === DisconnectReason.timedOut) {
        console.log("[🎰AZTEC] Connection Timed Out, Trying to Reconnect.");
        connectWithRetry();
      } else {
        console.log("[🌬AZTEC] Server Disconnected: Maybe Your WhatsApp Account got banned");
      }
    }

    if (connection === "open") {
      console.log('Plugins loaded♻️');
      console.log('WhatsApp chatbot has connected✔️');
      const version = require(__dirname + "/package.json").version;
      const BotName = require(__dirname + "/config.js").botName;
      const Mods = require(__dirname + "/config.js").mods;
      const aztec_text = `\`\`\`Vorterx connected \nversion: ${version}\nBotName: ${BotName}\nNUMBER: ${Mods}\`\`\``;
      vorterx.sendMessage(vorterx.user.id, { text: aztec_text });
    }

    if (update.qr) {
      vorterx.QR = qr.imageSync(update.qr);
    }
  });

  app.get("/", (req, res) => {
    res.end(vorterx.QR);
  });

  vorterx.ev.on('messages.upsert', async (messages) => await MessageHandler(messages, vorterx));
  vorterx.ev.on('contacts.update', async (update) => await contact.saveContacts(update, vorterx));

  await mongo.connect();
  process.on('exit', async () => {
    await mongo.close();
  });

  process.on('SIGINT', async () => {
    await mongo.close();
    await removeCreds();
    process.exit();
  });
}

async function startServer() {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

async function main() {
  await startAztec();
  await startServer();
}

main().catch((error) => {
  console.error("An error occurred:", error);
});
