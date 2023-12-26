const { MongoClient } = require('mongodb');
const { DisconnectReason, makeInMemoryStore, makeCacheableSignalKeyStore, useMultiFileAuthState, fetchLatestBaileysVersion, makeWASocket, makeMongoStore, useMongoDBAuthState } = require('@iamrony777/baileys');
const { Boom } = require('@hapi/boom');
const P = require('pino');
const express = require('express');
const { QuickDB } = require('quick.db');
const fs = require("fs");
const { Collection } = require('discord.js');
const config = require('./config.js');
const qr = require("qr-image");
const contact = require('./connects/contact.js');
const vorterx = require('./lib/client.js');
const MessageHandler = require('./lib/client.js');
const path = require('path');

const app = express();
const PORT = process.env.PORT || '3000';

if (!process.env.MONGODB) {
  console.error("Mongodb URL has not been provided yet...");
  process.exit(1);
}

async function startMongoDB() {
  try {
    const mongo = new MongoClient(process.env.MONGODB, {
      socketTimeoutMS: 100000,
      connectTimeoutMS: 100000,
      waitQueueTimeoutMS: 100000,
    });

    await mongo.connect();
    return mongo;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}

async function startAztec() {
  try {
    if (!process.env.MONGODB) {
      console.error("Mongodb URL has not been provided yet...");
      process.exit(1);
    }

    const session = './connects/session/creds.json';
    if (!fs.existsSync(session)) {
      console.error("creds.json file not found. Please provide creds json");
      process.exit(1);
    }

    const mongo = await startMongoDB();
    const authC = mongo.db().collection("auth");
    const { state: mongoState, saveCreds: saveMongoCreds } = await useMongoDBAuthState(authC);

    const store = makeInMemoryStore({ logger: P().child({ level: 'silent' }) });
    const { state, saveCreds } = await useMultiFileAuthState(__dirname + '/connects/session/');

    const vorterx = makeWASocket({
      version: (await fetchLatestBaileysVersion()).version,
      auth: {
        creds: state.creds,
        keys: makeCacheableSignalKeyStore(state.keys),
      },
      logger: P({ level: "silent" }),
      printQRInTerminal: false,
    });

    store.bind(vorterx.ev);
    vorterx.cmd = new Collection();
    vorterx.contactDB = new QuickDB().table('contacts');
    vorterx.contact = contact;

    async function loadCommands(pluginsDir) {
      const cmdFiles = getCommandFiles(pluginsDir);

      for (const file of cmdFiles) {
        const filePath = path.join(pluginsDir, file);
        const command = require(`.${path.sep}${filePath}`);
        vorterx.cmd.set(command.name, command);
      }
    }

    async function readCommands() {
      const pluginsDir = './plugins';
      const cmdFiles = getCommandFiles(pluginsDir);

      for (const file of cmdFiles) {
        const filePath = path.join(pluginsDir, file);
        const command = require(`.${path.sep}${filePath}`);
        vorterx.cmd.set(command.name, command);
      }
    }

    function getCommandFiles(dir) {
      const cmdFiles = [];
      const files = fs.readdirSync(dir);

      for (const file of files) {
        const filePath = path.join(dir, file);
        const isDirectory = fs.statSync(filePath).isDirectory();

        if (isDirectory) {
          const subDirFiles = fs.readdirSync(filePath).filter((subFile) => subFile.endsWith('.js'));
          cmdFiles.push(...subDirFiles.map((subFile) => path.join(file, subFile)));
        } else if (file.endsWith('.js')) {
          cmdFiles.push(file);
        }
      }

      return cmdFiles;
    }

    await readCommands();

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
        const toxic = `𝐶𝛩𝛮𝛮𝛯𝐶𝑇𝛯𝐷 𝑇𝛩 𝛥𝛧𝑇𝛯𝐶\n\n𝐵𝛩𝑇_𝛮𝛥𝛭𝛯: ${process.env.BOTNAME}\n𝛩𝑊𝛮𝛯𝑅_𝛮𝛥𝛭𝛯: ${process.env.OWNER_NAME}\n𝛲𝑅𝛯𝐹𝛪𝛸: ${process.env.PREFIX}\n𝑈𝑆𝛯𝑅_𝛮𝑈𝛭𝐵𝛯𝑅: ${process.MODS}\n\n${config.CAPTION}`;
        vorterx.sendMessage(vorterx.user.id, { text: toxic });

        await saveCreds();
      }
    });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

vorterx.ev.on('messages.upsert', async (messages) => await MessageHandler(messages, vorterx));
vorterx.ev.on('contacts.update', async (update) => await contact.saveContacts(update, vorterx));

} catch (error) {
  console.error("Error in startAztec:", error);

  vorterx.sendMessage(vorterx.user.id, {
    text: '──*『 ERROR FOUND 』*\n*ERROR*: ' + error.message
  });

  process.exit(1);
  }
}

startAztec();
