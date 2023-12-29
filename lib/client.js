const { serialize, decodeJid } = require('./index.js');
const chalk = require('chalk');
const axios = require('axios');
const config = require('../config.js');
const owner = config.mods;
const prefix = config.prefix;

async function Aztec(messages, vorterx) {
  try {
    if (messages.type !== 'notify') return;
    let coax = serialize(JSON.parse(JSON.stringify(messages.messages[0])), vorterx);
    if (!coax.message) return;
    if (coax.key && coax.key.remoteJid === 'status@broadcast') return;
    if (
      coax.type === 'protocolMessage' ||
      coax.type === 'senderKeyDistributionMessage' ||
      !coax.type ||
      coax.type === ''
    )
      return;

    const antilink = config.ANTILINK !== undefined ? config.ANTILINK : true;
    const { isGroup, type, sender, from, body } = coax;
    const gcMeta = isGroup ? await vorterx.groupMetadata(from) : '';
    const gcName = isGroup ? gcMeta.subject : '';
    const isCmd = body.startsWith(prefix);
    const getCMD = isCmd ? body.slice(1).trim().split(' ')[0].toLowerCase() : false;
    if (!isCmd) return;
    const cmd =
      vorterx.commands.find((cmd) => cmd.usage === getCMD) ||
      vorterx.commands.find((cmd) => cmd.alias && cmd.alias.includes(getCMD));
    const args = body.replace(getCMD, '').slice(1).trim();
    const text = coax.body ? body.trim().split(/ +/).slice(1).join(' ') : null;
    const groupMembers = gcMeta?.participants || [];
    const groupAdmins = groupMembers.filter((v) => v.admin).map((v) => v.id);
    const botNumber = await decodeJid(vorterx.user.id);
    const senderId = coax.sender.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
    const isDev =
      [botNumber, ...config.mods]
        .map((v) => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net')
        .find((creator) => creator === senderId) !== undefined;
    const isOwner = owner.includes(sender) || coax.isSelf;
    const mentionByTag =
      messages.type === 'extendedTextMessage' &&
      messages.messages[0].message.extendedTextMessage.contextInfo != null
        ? messages.messages[0].message.extendedTextMessage.contextInfo.mentionedJid
        : [];
    let participants = isGroup ? gcMeta.participants : [sender];
    let isBotAdmin = isGroup ? groupAdmins.includes(botNumber) : false;
    let isAdmin = isGroup ? groupAdmins.includes(sender) : false;
    let quoted = coax.quoted ? coax.quoted : coax;
    let mime;
    if (quoted.msg) {
      mime = quoted.msg.mimetype || '';
    } else if (coax.msg) {
      mime = coax.msg.mimetype || '';
    } else {
      mime = '';
    }
    let isMedia = /image|video|sticker|audio/.test(mime);

    async function antilinkCheck() {
      if (antilink && isGroup && groupAdmins.includes(vorterx.user.id.split(':')[0] + '@s.whatsapp.net') && body) {
        const groupCodeRegex = body.match(/chat.whatsapp.com\/(?:invite\/)?([\w\d]*)/);
        if (groupCodeRegex && groupCodeRegex.length === 2 && !groupAdmins.includes(sender)) {
          const groupCode = groupCodeRegex[1];
          const groupNow = await vorterx.groupInviteCode(from);
          if (groupCode !== groupNow) {
            await vorterx.sendMessage(from, { delete: coax.key });
            await vorterx.groupParticipantsUpdate(from, [sender], 'remove');
            coax.reply('__You have been removed__');
          }
        }
      }
    }

    antilinkCheck();

    if (body === prefix) {
      await react('❌');
    vorterx.sendMessage(coax.from, { text:'*🙏Im online, master?*'}, { quoted: coax });
    }

    if (coax.message && isGroup) {
      console.log(
        '' + '\n' + chalk.bgHex('#1F1F1F').hex('#FFD700').bold('[ GROUP ]   => '),
        chalk.bgHex('#363636').hex('#FF4500').bold(isGroup ? gcMeta.subject : coax.pushName) +
          '\n' +
          chalk.bgHex('#1F1F1F').hex('#FFD700').bold('[ SENDER ]  => '),
        chalk.bgHex('#363636').hex('#FF4500').bold(coax.pushName) +
          '\n' +
          chalk.bgHex('#1F1F1F').hex('#FFD700').bold('[ MESSAGE ] => '),
        chalk.bgHex('#363636').hex('#FF4500').bold(body || type) + '\n' + ''
      );
    }

    if (coax.message && !isGroup) {
      console.log(
        '' + '\n' + chalk.bgHex('#1F1F1F').hex('#FF69B4').bold('[ PRIVATE CHAT ] => '),
        chalk.bgHex('#363636').hex('#FF69B4').bold('+' + coax.from.split('@')[0]) +
          '\n' +
          chalk.bgHex('#1F1F1F').hex('#FF69B4').bold('[ SENDER ]       => '),
        chalk.bgHex('#363636').hex('#FF69B4').bold(coax.pushName) +
          '\n' +
          chalk.bgHex('#1F1F1F').hex('#FF69B4').bold('[ MESSAGE ]      => '),
        chalk.bgHex('#363636').hex('#FF69B4').bold(body || type) + '\n' + ''
      );
    }

    async function react(emoji) {
      const getReact = {
        react: { text: emoji, key: coax.key },
      };
      await vorterx.sendMessage(coax.from, getReact);
    }

    if (cmd && typeof cmd === 'function') {
      try {
        cmd(vorterx, coax, {
          pushName: coax.pushName,
          args,
          isAdmin,
          isMedia,
          getCMD,
          isBotAdmin,
          mentionByTag,
          isDev,
          participants,
          mime,
          react,
          quoted,
          command: cmd.name,
          toUpper: function toUpper(query) {
            return query.replace(/^\w/, (c) => c.toUpperCase());
          },
        });
      } catch (err) {
        console.log(err, 'red');
      }
    }
  } catch (error) {
    console.error(error);
  }
}

module.exports = Aztec;
