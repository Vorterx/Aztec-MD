const { serialize, decodeJid } = require('./index.js');
  const chalk = require('chalk');
    const fs = require('fs'), os = require('os');
    const axios = require('axios');
      const config = require('../config.js');
        const owner = config.mods;
         const prefix = config.prefix;
           let Zenith = require("./_cmd_sxntax.js");

async function Aztec(messages, vorterx) {
    try {
        if (messages.type !== 'notify') return;
          let m = serialize(JSON.parse(JSON.stringify(messages.messages[0])), vorterx);
           if (!m.message) return;
             if (m.key && m.key.remoteJid === 'status@broadcast') return;
              if (
               m.type === 'protocolMessage' ||
                m.type === 'senderKeyDistributionMessage' ||
                !m.type ||
                  m.type === ''
            )
             return;

                const { isGroup, type, sender, chat, body } = m;
                  const gcMeta = isGroup ? await vorterx.groupMetadata(m.chat) : '';
                   const gcName = isGroup ? gcMeta.subject : '';
                     const isCmd = body.startsWith(prefix);
                       const getCMD = isCmd ? body.slice(1).trim().split(' ')[0].toLowerCase() : false;
                       if (!isCmd) return;

        const cmd =
            Zenith.commands &&
            (Zenith.commands.find((cmd) => cmd.usage === getCMD) ||
                Zenith.commands.find((cmd) => cmd.alias && cmd.alias.includes(getCMD)));

        const args = body.replace(getCMD, '').slice(1).trim();
          const text = m.body ? body.trim().split(/ +/).slice(1).join(' ') : null;
            const groupMembers = gcMeta?.participants || [];
             const groupAdmins = groupMembers.filter((v) => v.admin).map((v) => v.id);
               const botNumber = await decodeJid(vorterx.user.id);
                const senderId = m.sender.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
                 const isDev =
                  [botNumber, ...config.mods]
                .map((v) => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net')
                .find((creator) => creator === senderId) !== undefined;
                 const isOwner = owner.includes(sender) || m.isSelf;
                  const mentionByTag =
                   messages.type === 'extendedTextMessage' &&
                    messages.messages[0].message.extendedTextMessage.contextInfo != null
                     ? messages.messages[0].message.extendedTextMessage.contextInfo.mentionedJid
                     : [];
                      let participants = isGroup ? gcMeta.participants : [sender];
                       let isBotAdmin = isGroup ? groupAdmins.includes(botNumber) : false;
                        let isAdmin = isGroup ? groupAdmins.includes(sender) : false;
                         let quoted = m.quoted ? m.quoted : m;
                          let mime;
          if (quoted.msg) {
            mime = quoted.msg.mimetype || '';
        } else if (m.msg) {
            mime = m.msg.mimetype || '';
        } else {
            mime = '';
        }
        let isMedia = /image|video|sticker|audio/.test(mime);

const antilink = config.antilink;
if (antilink && isGroup && groupAdmins.includes(vorterx.user.id.split(':')[0] + '@s.whatsapp.net') && body) {
      const groupCodeRegex = body.match(/chat.whatsapp.com\/(?:invite\/)?([\w\d]*)/);
    if (groupCodeRegex && groupCodeRegex.length === 2 && !groupAdmins.includes(m.sender)) {
        const groupCode = groupCodeRegex[1];
        const groupNow = await vorterx.groupInviteCode(chat);
        if (groupCode !== groupNow) {
            const key = {
                  remoteJid: m.chat,
                fromMe: false,
              id: m.id,
          participant: m.sender,
          };

             await vorterx.sendMessage(m.chat, {text: '------------[*LINK DETECTED*]--------\n*SENDER*: ' + m.pushName + '\n\n*BYE*'});
          await vorterx.sendMessage(m.chat, { delete: key });
        await vorterx.groupParticipantsUpdate(m.chat, [m.sender], "remove");
     m.reply('__You have been removed__');
        }
    }
}

  if (body === prefix) {
         await react('❌');
      vorterx.sendMessage(m.chat, { text: '*Hi lm online...?*'}, { quoted: m });
    }

    if (m.message) {
    const { subject, chat } = isGroup ? gcMeta : { subject: '', chat: '+' + m.chat.split('@')[0] };
    const xvier = isGroup ? '#4CAF50' : '#3498db';
    console.log(
        `\n${chalk.bgHex('#303030').hex(xvier).bold(`[ ${isGroup ? 'GROUP' : 'PRIVATE INBOX'} ] `)}` +
        `${chalk.bgHex('#1F1F1F').hex(xvier).bold(`- ${isGroup ? subject : chat}`)}\n` +
        `${chalk.bgHex('#303030').hex('#4CAF50').bold('[ 💡 NAME ] ')}   ` +
        `${chalk.bgHex('#1F1F1F').hex('#4CAF50').bold(m.pushName)}\n` +
        `${chalk.bgHex('#303030').hex('#3498db').bold('[ 💡 INFO ] ')}   ` +
        `${chalk.bgHex('#1F1F1F').hex('#3498db').bold(body || type)}\n`
      );
   }

      if (!isGroup && !isDev) { 
           await react("⚠️");
         return m.reply("*Using commands in inbox is not allowed*");
        } 
     const botNames = JSON.parse(fs.readFileSync('./get_TIME.json')).botNames;
  const get_BOTS = () => botNames[Math.floor(Math.random() * botNames.length)];

 const updateProfileStatus = () => {
  if (config.AUTO_BIO) {
  const InSeconds = Math.floor(os.uptime());
 const status = `« ${get_BOTS()} » [Online for ${InSeconds}s]`;
await vortex.updateProfileStatus(status);
  }
};

setInterval(updateProfileStatus, 60 * 1000);
      
        async function react(emoji) {
            const getReact = {
                react: { text: emoji, key: m.key },
            };
            await vorterx.sendMessage(m.chat, getReact);
        }

        if (cmd && cmd.function && typeof cmd.function === 'function') {
    try {
        cmd.function(
            vorterx,
            m,
            react,
            {
                pushName: m.pushName,
                  args,
                   text,
                    isAdmin,
                     isMedia,
                      getCMD,
                       isBotAdmin,
                         mentionByTag,
                          isDev,
                           participants,
                            mime,
                             quoted,
                              command: cmd.usage,
                               toUpper: function toUpper(query) {
                               return query.replace(/^\w/, (c) => c.toUpperCase());
                          }
                 }
          );
   } catch (err) {
             console.log(err, 'red');
          }
      } 
 }   catch (error) {
           console.error(error);
       }
   }
     
module.exports = Aztec;
