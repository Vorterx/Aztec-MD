require('../../config.js');
const config = require('../../config.js');
const { serialize, decodeJid } = require('./D3centX.js');
const chalk = require('chalk');
const prefix = process.env.PREFIX;

module.exports = MessageHandler = async (messages, vorterx) => {
  try {
    if (messages.type !== 'notify') return;
    let m = serialize(JSON.parse(JSON.stringify(messages.messages[0])), vorterx);
    if (!m.message) return;
    if (m.key && m.key.remoteJid === 'status@broadcast') return;
    if (m.type === 'protocolMessage' || m.type === 'senderKeyDistributionMessage' || !m.type || m.type === '') return;

    const antilink = process.env.ANTILINK || true;
    const { isGroup, type, sender, from, body } = m;
    const gcMeta = isGroup ? await vorterx.groupMetadata(from) : '';
    const gcName = isGroup ? gcMeta.subject : '';
    const args = body.trim().split(/ +/).slice(1);
    const text = (q = args.join(" "));
    const isCmd = body.startsWith(prefix);
    const cmdName = body.slice(1).trim().split(/ +/).shift().toLowerCase();
    const arg = body.replace(cmdName, '').slice(1).trim();
    const groupMembers = gcMeta?.participants || [];
    const botNumber = await decodeJid(vorterx.user.id);
    const mentionByTag =
      messages.type === 'extendedTextMessage' && messages.messages[0].message.extendedTextMessage.contextInfo != null
      ? messages.messages[0].message.extendedTextMessage.contextInfo.mentionedJid
      : [];
    let participants = isGroup ? gcMeta.participants : [sender];
    const groupAdmins = groupMembers.filter((v) => v.admin).map((v) => v.id);
    let isBotAdmin = isGroup ? groupAdmins.includes(botNumber) : false;
    let isAdmin = isGroup ? groupAdmins.includes(sender) : false;
    let quoted = m.quoted ? m.quoted : m;

    let mime;
    if (quoted.msg) {
      mime = quoted.msg.mimetype || "";
    } else if (m.msg) {
      mime = m.msg.mimetype || "";
    } else {
      mime = "";
    }
    if (antilink == true) {
      if (isGroup && groupAdmins.includes(vorterx.user.id.split(':')[0] + '@s.whatsapp.net') && body) {
      const groupCodeRegex = body.match(/chat.whatsapp.com\/(?:invite\/)?([\w\d]*)/);
      if (groupCodeRegex && groupCodeRegex.length === 2 && !groupAdmins.includes(sender)) {
       const groupCode = groupCodeRegex[1];
      const groupNow = await vorterx.groupInviteCode(from);
        if (groupCode !== groupNow) {
         await vorterx.sendMessage(from, { delete: m.key });
        await vorterx.groupParticipantsUpdate(from, [sender], 'remove');
            m.reply('⭐*Trash has been removed successfully*');
          }
        }
      }
    }
const mode = {
  set: function(Modes) {
    config.WORKTYPE = Modes;
  },
  get: function() {
    return config.WORKTYPE || 'private';
  },
};
if (isCmd || prefix) {
  const WORKTYPE = mode.get();
  if (WORKTYPE === 'private') {
    const mods = config.MODS.split(',');
    if (mods.includes(m.sender) || m.sender === botNumber) {
    }
  } else if (WORKTYPE === 'public') 
   }
}
if (body === prefix) {
  await xReact("💢");
  var az_thumb = "https://i.ibb.co/Mnb4xnc/125290678-wrong-symbol-or-x-mark.jpg";
  vorterx.sendMessage(
    m.from,
    {
      image: { url: az_thumb },
      caption: "*🙋‍♂️Can I help you, master?* Use [" + prefix + "menu] *to get my commands.*",
    },
    { quoted: m }
  );
}
    if (m.message && isGroup) {
      console.log(
        "" +
          "\n" +
          chalk.black(chalk.bgWhite("[ GROUP ]   => ")),
        chalk.black(chalk.bgRed(isGroup ? gcMeta.subject : m.pushName)) +
          "\n" +
          chalk.black(chalk.bgWhite("[ SENDER ]  => ")),
        chalk.black(chalk.bgRed(m.pushName)) +
          "\n" +
          chalk.black(chalk.bgWhite("[ MESSAGE ] => ")),
        chalk.black(chalk.bgRed(body || type)) +
          "\n" +
          ""
      );
    }
    if (m.message && !isGroup) {
      console.log(
        "" +
          "\n" +
          chalk.green(chalk.bgWhite("[ PRIVATE CHAT ] => ")),
        chalk.red(chalk.bgMagentaBright("+" + m.from.split("@")[0])) +
          "\n" +
          chalk.green(chalk.bgWhite("[ SENDER ]       => ")),
        chalk.yellow(chalk.bgMagentaBright(m.pushName)) +
          "\n" +
          chalk.blue(chalk.bgWhite("[ MESSAGE ]      => ")),
        chalk.green(chalk.bgMagentaBright(body || type)) +
          "\n" +
          ""
      );
    }

    async function xReact(emoji) {
      const reactm = {
        react: {
          text: emoji,
          key: m.key,
        },
      };
      await vorterx.sendMessage(m.from, reactm);
    }

    if (!isCmd) return;
    try {
      const command = vorterx.cmd.get(cmdName) || vorterx.cmd.find((cmd) => cmd.alias && cmd.alias.includes(cmdName));
      if (command && typeof command.xstart === 'function') {
        command.xstart(vorterx, {
          name: "vorterx",
          pushName: m.pushName, arg,args,text,participants,
          mentionByTag, mime,quoted, isAdmin,mode,
          isBotAdmin,xReact,
        });
      }
    } catch (err) {
      err = String(err);
      if (!err.includes("command.xstart")) console.error(err, "red");
    }
  } catch (error) {
    console.error(error);
  }
};
