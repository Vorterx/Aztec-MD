const { serialize, decodeJid } = require('./index.js');
const chalk = require('chalk')
const axios = require('axios');
const config = require('../config.js');
const owner = config.mods;
const prefix = config.prefix;



module.exports = MessageHandler = async (messages, vorterx) => {
  try {
    if (messages.type !== 'notify') return
    let m = serialize(JSON.parse(JSON.stringify(messages.messages[0])), vorterx)
    if (!m.message) return
    if (m.key && m.key.remoteJid === 'status@broadcast') return
    if (m.type === 'protocolMessage' || m.type === 'senderKeyDistributionMessage' || !m.type || m.type === '')
    return
    const antilink = config.ANTILINK || true
    const { isGroup, type, sender, from, body } = m
    const gcMeta = isGroup ? await vorterx.groupMetadata(from) : '';
    const gcName = isGroup ? gcMeta.subject : '';
    const args = body.trim().split(/ +/).slice(1);
    const text = (q = args.join(" "));
    const isCmd = body.startsWith(prefix)
    const cmdName = body.slice(1).trim().split(/ +/).shift().toLowerCase();
    const arg = body.replace(cmdName, '').slice(1).trim()
    const groupMembers = gcMeta?.participants || [];
    const groupAdmins = groupMembers.filter((v) => v.admin).map((v) => v.id)
    const botNumber = await decodeJid(vorterx.user.id);
    const isOwner = owner.includes(sender) || m.isSelf;
    const mentionByTag = messages.type === 'extendedTextMessage' && messages.messages[0].message.extendedTextMessage.contextInfo != null
    ? messages.messages[0].message.extendedTextMessage.contextInfo.mentionedJid
    : [];
    let participants = isGroup ? gcMeta.participants : [sender];
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
    let isMedia = /image|video|sticker|audio/.test(mime);
    if(antilink == true) {
      if ( isGroup &&   groupAdmins.includes(vorterx.user.id.split(':')[0] + '@s.whatsapp.net') && body ) {
      const groupCodeRegex = body.match(/chat.whatsapp.com\/(?:invite\/)?([\w\d]*)/)
      if (groupCodeRegex && groupCodeRegex.length === 2 && !groupAdmins.includes(sender)) {
        const groupCode = groupCodeRegex[1]
        const groupNow = await vorterx.groupInviteCode(from)
       if (groupCode !== groupNow) {
          await vorterx.sendMessage(from, { delete: m.key })
          { await vorterx.groupParticipantsUpdate(from, [sender], 'remove')
          m.reply('__You have been removed__')}
        }}
    }}
    async function connect(emoji) {
     const xcode = { react: { text: emoji, key: m.key, }, };
     await vorterx.sendMessage(m.from, xcode);
   }
    if (body === prefix) {
    await connect("💢");
    var az_thumb = "https://i.ibb.co/Mnb4xnc/125290678-wrong-symbol-or-x-mark.jpg";
    vorterx.sendMessage( m.from, { image: { url: az_thumb }, caption: "*🙋‍♂️Can I help you, master?* Use [" + prefix + "menu] *to get my commands.*", }, { quoted: m });
  }
const mode = {
  set: function (Modes) {
  config.WORKTYPE = Modes;
  },
  get: function () {
return config.WORKTYPE || 'private';
  },
};
if (isCmd || prefix) {
  const WORKTYPE = mode.get();
  if (WORKTYPE === 'private') {
const mods = typeof config.mods === 'string' ? config.mods.split(',') : [];
  if (mods.length === 0 || mods.includes(m.sender) || m.sender === botNumber) {
    }
  } else if (WORKTYPE === 'public') {
  } else if (WORKTYPE === 'group_work') {
 if (m.isGroup) {
  } else if (text.startsWith(prefix)) {
 await connect('❌');
return m.reply("*The bot only works in group chats. Please use the bot within a group context...*");
    }
  }
}
async function getJson(url, options) {
  try {
    options = options || {};
    const res = await axios({
      method: "GET",
      url: url,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36",
      },
      ...options,
    });
    return res.data;
  } catch (err) {
   m.reply('Error occurred while fetching JSON data.');
  }
}
    if (m.message && isGroup) {
      console.log("" + "\n" + chalk.black(chalk.bgWhite("[ GROUP ]   => ")),
      chalk.black(
      chalk.bgRed(isGroup ? gcMeta.subject : m.pushName) ) +
        "\n" +
      chalk.black(chalk.bgWhite("[ SENDER ]  => ")),
      chalk.black(chalk.bgRed(m.pushName)) +
        "\n" +
      chalk.black(chalk.bgWhite("[ MESSAGE ] => ")),
      chalk.black(chalk.bgRed(body || type)) + "\n" + ""
      );
    }
    if (m.message && !isGroup) {
      console.log("" + "\n" + chalk.black(chalk.bgWhite("[ PRIVATE CHAT ] => ")),
      chalk.black(chalk.bgMagentaBright("+" + m.from.split("@")[0])) +
        "\n" +
      chalk.black(chalk.bgWhite("[ SENDER ]       => ")),
      chalk.black(chalk.bgMagentaBright(m.pushName)) +
        "\n" +
      chalk.black(chalk.bgWhite("[ MESSAGE ]      => ")),
      chalk.black(chalk.bgMagentaBright(body || type)) + "\n" + ""
      );
    }
    if (!isCmd) return
    if (isCmd.owner && !isOwner) {
		return await m.reply("Sorry youre not my owner");
   }
    const command = vorterx.cmd.get(cmdName) || vorterx.cmd.find((cmd) => cmd.alias && cmd.alias.includes(cmdName))
    if (command && typeof command.client === 'function') {
    command.client(vorterx, m, { name: "vorterx", pushName: m.pushName, arg, args, isAdmin, isMedia, getJson, isBotAdmin, mentionByTag, participants, text, mime, connect, quoted, mode: mode.get(),});
  }
  } catch (err) {
  console.log(err, 'red')
  }
}
