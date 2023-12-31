const { serialize, decodeJid } = require('./index.js');
  const chalk = require('chalk');
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

              const antilink = config.ANTILINK !== undefined ? config.ANTILINK : true;
                const { isGroup, type, sender, chat, body } = m;
                  const gcMeta = isGroup ? await vorterx.groupMetadata(chat) : '';
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

        async function antilinkCheck() {
            if (antilink && isGroup && groupAdmins.includes(vorterx.user.id.split(':')[0] + '@s.whatsapp.net') && body) {
                const groupCodeRegex = body.match(/chat.whatsapp.com\/(?:invite\/)?([\w\d]*)/);
                if (groupCodeRegex && groupCodeRegex.length === 2 && !groupAdmins.includes(sender)) {
                    const groupCode = groupCodeRegex[1];
                    const groupNow = await vorterx.groupInviteCode(chat);
                    if (groupCode !== groupNow) {
                        await vorterx.sendMessage(chat, { delete: m.key });
                        await vorterx.groupParticipantsUpdate(chat, [sender], 'remove');
                        m.reply('__You have been removed__');
                    }
                }
            }
        }

        antilinkCheck();

        if (body === prefix) {
            await react('❌');
            vorterx.sendMessage(m.chat, { text: '*Hi lm online...?*'}, { quoted: m });
        }

        if (m.message && isGroup) {
            console.log(
                '' + '\n' + chalk.bgHex('#1F1F1F').hex('#FFD700').bold('[ GROUP ]   => '),
                chalk.bgHex('#363636').hex('#FF4500').bold(isGroup ? gcMeta.subject : m.pushName) +
                '\n' +
                chalk.bgHex('#1F1F1F').hex('#FFD700').bold('[ NAME ]  => '),
                chalk.bgHex('#363636').hex('#FFD700').bold(m.pushName) +
                '\n' +
                chalk.bgHex('#1F1F1F').hex('#FFD700').bold('[ INFO ] => '),
                chalk.bgHex('#363636').hex('#FFD700').bold(body || type) + '\n' + ''
            );
        }

        if (m.message && !isGroup) {
            console.log(
                '' + '\n' + chalk.bgHex('#1F1F1F').hex('#FF69B4').bold('[ PRIVATE INBOX ] => '),
                chalk.bgHex('#363636').hex('#FF69B4').bold('+' + m.chat.split('@')[0]) +
                '\n' +
                chalk.bgHex('#1F1F1F').hex('#FF69B4').bold('[ NAME ]       => '),
                chalk.bgHex('#363636').hex('#FF69B4').bold(m.pushName) +
                '\n' +
                chalk.bgHex('#1F1F1F').hex('#FF69B4').bold('[ INFO ]      => '),
                chalk.bgHex('#363636').hex('#FF69B4').bold(body || type) + '\n' + ''
            );
        }

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
                              commands: cmd.usage,
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
