const { MongoClient } = require("mongodb");
const { DisconnectReason, makeInMemoryStore, makeCacheableSignalKeyStore, useMultiFileAuthState, fetchLatestBaileysVersion, makeWASocket, makeMongoStore, useMongoDBAuthState } = require('@iamrony777/baileys');
const { Boom } = require('@hapi/boom');
const P = require('pino');
const express = require('express');
const { QuickDB } = require('quick.db');
const fs = require("fs");
const path = require('path');
const { Collection } = require('discord.js');
const config = require('./config.js');
const botName = process.env.BOTNAME;
const qr = require("qr-image");
const contact = require('./connects/contact.js');
const { MessageHandler, vorterx } = require('./lib/client.js');

const app = express();
const PORT = process.env.PORT;

if (!process.env.MONGODB) {
  console.error("Mongodb URL has not been provided yet...");
  process.exit(1);
}

const sessionId = config.SESSION_ID.replace(/\s/g, '_');
if (!sessionId) {
  console.error("config.SESSION_ID is not defined.");
  process.exit(1);
}

async function removeCreds() {
  try {
    fs.unlinkSync("./lib/remove.json");
  } catch (error) {
    console.error("Error removing creds:", error);
  }
}

async function connectMongoDB() {
  const mongo = new MongoClient(process.env.MONGODB, {
    socketTimeoutMS: 100000,
    connectTimeoutMS: 100000,
    waitQueueTimeoutMS: 100000,
  });

  await mongo.connect();
  return mongo;
}

async function loadCommands(pluginsDir) {
  const cmdFiles = getCommandFiles(pluginsDir);

  for (const file of cmdFiles) {
    const filePath = path.join(pluginsDir, file);
    console.log('Loading cmds:', filePath);

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

async function startAztec() {
  try {
    console.log("Initializing...");

    const inMemoryStore = makeInMemoryStore({ logger: P().child({ level: 'silent', stream: 'store' }) });
    const { state, saveCreds } = await useMultiFileAuthState(sessionId);

    console.log("Aztec state loaded successfully.");

    const mongo = await connectMongoDB();

    const authC = mongo.db(sessionId).collection("auth");
    const { state: mongoState, saveCreds: saveMongoCreds } = await useMongoDBAuthState(authC);

    const mongoStore = makeMongoStore({
      filterChats: true,
      db: mongo.db(sessionId),
      autoDeleteStatusMessage: true
    });

    let vorterx = makeWASocket({
      version: (await fetchLatestBaileysVersion()).version,
      auth: {
        creds: state.creds,
        keys: makeCacheableSignalKeyStore(state.keys),
      },
      logger: P({ level: "silent" }),
      printQRInTerminal: true,
    });

    if (mongoStore) {
      mongoStore.bind(vorterx.ev);
    } else {
      console.error("Error: 'mongoStore' is undefined. Please fix.");
    }

    vorterx.cmd = new Collection();
    vorterx.contactDB = new QuickDB().table('contacts');
    vorterx.contact = contact;

    await readCommands();

    vorterx.ev.on('creds.update', async () => {
      await state.saveCreds();
      await state.saveMongoCreds();
    });

    vorterx.ev.on('connection.update', async (update) => {
      const { connection, lastDisconnect } = update;

      console.log("Connection update:", connection);

      if (connection === "open") {
        console.log('Connection is open!');
        console.log('Plugins loaded♻️');
        console.log('WhatsApp chatbot has connected✔️');

        const toxic = `Hello, I am your WhatsApp chatbot *${botName}*. Ready to assist you!`;
        vorterx.sendMessage(vorterx.user.id, { text: toxic });
      } else if (connection === "close") {
        let reason = new Boom(lastDisconnect?.error)?.output.statusCode;

        switch (reason) {
          case DisconnectReason.connectionClosed:
          case DisconnectReason.connectionLost:
            console.log("[🐏AZTEC] Connection closed or lost, reconnecting in 3000ms.");
            setTimeout(() => {

            }, 3000);
            break;
          case DisconnectReason.loggedOut:
            console.log("[😭AZTEC] Device Logged Out, Cleaning up session.");
            await removeCreds();
            process.exit();
            break;
          case DisconnectReason.restartRequired:
            console.log("[♻️AZTEC] Server starting.");

            break;
          case DisconnectReason.timedOut:
            console.log("[🎰AZTEC] Connection Timed Out, Trying to Reconnect.");

            break;
          default:
            console.log("[🌬AZTEC] Server Disconnected: Maybe Your WhatsApp Account got banned");
        }
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

    process.on('exit', async () => {
      await mongo.close();
    });

    process.on('SIGINT', async () => {
      await mongo.close();
      await removeCreds(); 
      process.exit();
    });

  } catch (error) {
    console.error("An error occurred during initialization:", error);
    process.exit(1);
  }
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
  process.exit(1);
});
