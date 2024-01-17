const { MongoClient } = require('mongodb');
const { DisconnectReason, makeInMemoryStore, makeCacheableSignalKeyStore, useMultiFileAuthState, fetchLatestBaileysVersion, makeWASocket, makeMongoStore, useMongoDBAuthState } = require('@iamrony777/baileys');
const { Boom } = require('@hapi/boom');
const P = require('pino');
const cfonts = require('cfonts');
const express = require('express');
const { QuickDB } = require('quick.db');
const fs = require("fs");
const { Collection } = require('discord.js');
const config = require('./config.js');
const qr = require("qr-image");
const contact = require('./connects/contact.js');
const vorterx = require('./lib/client.js');
const Aztec = require('./lib/client.js');
const path = require('path');

const app = express();
const PORT = (process.env.PORT || '3000') + (process.env.PORT ? '' : 'true');

config.MONGODB || (console.error("Error: _MongoDB URL is not provided_") && process.exit(1));

async function startMongoDB() {
  try {
    const mongo = new MongoClient(config.MONGODB, {
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

  !config.MONGODB ? console.error("Error: MongoDB URL is not provided") && process.exit(1) : null;
     const session = './connects/session/creds.json';
fs.existsSync(session) || console.error(`Error: ${session} _Please provide creds json_`) ?? process.exit(1);
    

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

 const loadCommands = pluginsDir => getCommandFiles(pluginsDir)
  .map(file => path.join(pluginsDir, file))
  .forEach(file => vorterx.cmd.set(require(`.${path.sep}${file}`).name, require(`.${path.sep}${file}`));

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
    let getReconet = "[🐲AZTEC] Connection closed, reconnecting.";

    switch (reason) {
        case DisconnectReason.connectionLost:
            getReconet = "[🐏AZTEC] Connection Lost from Server, reconnecting.";
            break;
        default:
            getReconet = "[🌬AZTEC] Server Disconnected: Maybe Your QR logged out.";
    }

    console.log(getReconet);      
    startAztec();
} else if (connection === "open") {
      
    console.log('[🐲AZTEC] Connection opened. Plugins loaded♻️\nWhatsApp chatbot has connected✔️');
          
      const text = 'AZTEC';
  const rainbow = {
    'A': 'red',
      'Z': 'orange',
       'T': 'yellow',
         'E': 'green',
          'C': 'blue',
           'M': 'indigo',
             'D': 'violet',
};
const colors = Array.from(text).map(char => rainbow[char.toUpperCase()]);
cfonts.say(text, {
    font: 'block',
      align: 'center',
       colors,
        background: 'transparent',
         letterSpacing: 1,
           lineHeight: 1,
});
  
  const toxic = `╭–––––––––––––––༓ 
┆✑  Online now🌷
╰–––––––––––––––༓ 
╭–– 『 *CONNECTED* 』      
┆ _Owner_ : ${process.env.OWNER_NAME}
┆ _Prefix_ :  ${config.Prefix}
┆ _Time_ : ${new Date().toLocaleTimeString()}
╰–––––––––––––––༓\n\n${config.CAPTION}`;
        vorterx.sendMessage(vorterx.user.id, { text: toxic });

        await saveCreds();
      }
    });

  app.listen(PORT + (process.env.PORT ? '' : 'true'), () => {
  console.log(`ON PORT: ${PORT}`);
});

vorterx.ev.on('messages.upsert', async (messages) => await Aztec(messages, vorterx));
vorterx.ev.on('contacts.update', async (update) => await contact.saveContacts(update, vorterx));

} catch (error) {
  console.error("404:", error);
  process.exit(1);
  }
}

startAztec();
