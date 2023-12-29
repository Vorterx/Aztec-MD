const { serialize, decodeJid } = require('./index.js');
const chalk = require('chalk');
const axios = require('axios');
const { Quiz } = require('anime-quiz');
const config = require('../config.js');
const owner = config.mods;
const prefix = config.prefix;

module.exports = MessageHandler = async (messages, vorterx) => {
  try {
    if (messages.type !== 'notify') return;
    let coax = serialize(JSON.parse(JSON.stringify(messages.messages[0])), vorterx);
    if (!coax.message) return;
    if (coax.key && coax.key.remoteJid === 'status@broadcast') return;
    if (coax.type === 'protocolMessage' || coax.type === 'senderKeyDistributionMessage' || !coax.type || coax.type === '') return;

    const antilink = config.ANTILINK || true;
    const { isGroup, type, sender, from, body } = coax;
    const gcMeta = isGroup ? await vorterx.groupMetadata(from) : '';
    const gcName = isGroup ? gcMeta.subject : '';
    const isCmd = body.startsWith(prefix);
    const getCMD = isCmd ? body.slice(1).trim().split(" ")[0].toLowerCase() : false;
    if (!isCmd) return;
    const cmd = vorterx.commands.find((cmd) => cmd.usage === getCMD) || vorterx.commands.find((cmd) => cmd.alias && cmd.alias.includes(getCMD));
    const args = body.replace(getCMD, '').slice(1).trim();
    const text = coax.body ? body.trim().split(/ +/).slice(1).join(" ") : null;
    const groupMembers = gcMeta?.participants || [];
    const groupAdmins = groupMembers.filter((v) => v.admin).map((v) => v.id);
    const botNumber = await decodeJid(vorterx.user.id);
    const senderId = coax.sender.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
    const isDev = [botNumber, ...config.mods]
      .map((v) => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net")
      .find((creator) => creator === senderId) !== undefined;
    const isOwner = owner.includes(sender) || coax.isSelf;
    const mentionByTag = messages.type === 'extendedTextMessage' && messages.messages[0].message.extendedTextMessage.contextInfo != null
      ? messages.messages[0].message.extendedTextMessage.contextInfo.mentionedJid
      : [];
    let participants = isGroup ? gcMeta.participants : [sender];
    let isBotAdmin = isGroup ? groupAdmins.includes(botNumber) : false;
    let isAdmin = isGroup ? groupAdmins.includes(sender) : false;
    let quoted = coax.quoted ? coax.quoted : coax;
    let mime;
    if (quoted.msg) {
      mime = quoted.msg.mimetype || "";
    } else if (coax.msg) {
      mime = coax.msg.mimetype || "";
    } else {
      mime = "";
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
      await connect("❌");
      var az_thumb = "https://i.ibb.co/Mnb4xnc/125290678-wrong-symbol-or-x-mark.jpg";
      vorterx.sendMessage(coax.from, {
        image: { url: az_thumb },
        caption: "*🙋‍♂️Can I help you, master?* Use [" + prefix + "menu] *to get my commands.*",
      }, { quoted: coax });
    }

    if (coax.message && isGroup) {
      console.log("" + "\n" + chalk.black(chalk.bgWhite("[ GROUP ]   => ")),
        chalk.black(
          chalk.bgRed(isGroup ? gcMeta.subject : coax.pushName)) +
        "\n" +
        chalk.black(chalk.bgWhite("[ SENDER ]  => ")),
        chalk.black(chalk.bgRed(coax.pushName)) +
        "\n" +
        chalk.black(chalk.bgWhite("[ MESSAGE ] => ")),
        chalk.black(chalk.bgRed(body || type)) + "\n" + ""
      );
    }

    if (coax.message && !isGroup) {
      console.log("" + "\n" + chalk.black(chalk.bgWhite("[ PRIVATE CHAT ] => ")),
        chalk.black(chalk.bgMagentaBright("+" + coax.from.split("@")[0])) +
        "\n" +
        chalk.black(chalk.bgWhite("[ SENDER ]       => ")),
        chalk.black(chalk.bgMagentaBright(coax.pushName)) +
        "\n" +
        chalk.black(chalk.bgWhite("[ MESSAGE ]      => ")),
        chalk.black(chalk.bgMagentaBright(body || type)) + "\n" + ""
      );
    }

    async function connect(emoji) {
      const getReact = {
        react: { text: emoji, key: coax.key, },
      };
      await vorterx.sendMessage(coax.from, getReact);
    }

    if (cmd && typeof cmd.client === 'function') {
      try {
        cmd.client(
          vorterx,
          coax,
          {
            name: "vorterx",
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
            connect,
            quoted,
            command: cmd.name,
            toUpper: function toUpper(query) {
              return query.replace(/^\w/, (c) => c.toUpperCase());
            }
          }
        );
      } catch (err) {
        console.log(err, 'red');
      }
    }
  } catch (error) {
    console.error(error);
  }
};
    
