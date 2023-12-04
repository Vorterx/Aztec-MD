const { serialize, decodeJid } = require('./index.js');
const chalk = require('chalk')
const config = require('../../config.js');
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
    const gcMeta = isGroup ? await vorterx.groupMetadata(from) : ''
    const gcName = isGroup ? gcMeta.subject : ''
    const args = body.trim().split(/ +/).slice(1)
    const isCmd = body.startsWith(prefix)
    const cmdName = body.slice(dsan.prefix.length).trim().split(/ +/).shift().toLowerCase()
    const arg = body.replace(cmdName, '').slice(1).trim()
    const groupMembers = gcMeta?.participants || []
    const groupAdmins = groupMembers.filter((v) => v.admin).map((v) => v.id)
    const m = body.slice(1).trim().split(/ +/).shift().toLowerCase();
    onst botNumber = await decodeJid(vorterx.user.id);
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
    const command = vorterx.cmd.get(cmdName) || vorterx.cmd.find((cmd) => cmd.alias && cmd.alias.includes(cmdName))
    command.execute(vorterx, arg, m, args, isAdmin, isBotAdmin, mode, text, mime, quoted)
  } catch (err) {
  console.log(err, 'red')
   }
 }
