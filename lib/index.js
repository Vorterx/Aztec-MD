const { proto, getContentType, jidDecode, downloadContentFromMessage } = require('@iamrony777/baileys');

const decodeJid = (jid) => {
  const { user, server } = jidDecode(jid) || {};
  return user && server ? `${user}@${server}`.trim() : jid;
};

const downloadMedia = async (message) => {
  let type = Object.keys(message)[0];
  let coax = message[type];
  if (type === 'buttonsMessage' || type === 'viewOnceMessageV2') {
    if (type === 'viewOnceMessageV2') {
      coax = message.viewOnceMessageV2?.message;
      type = Object.keys(coax || {})[0];
    } else {
      type = Object.keys(coax || {})[1];
      coax = coax[type];
    }
  }
  const stream = await downloadContentFromMessage(coax, type.replace('Message', ''));
  let buffer = Buffer.from([]);
  for await (const chunk of stream) {
    buffer = Buffer.concat([buffer, chunk]);
  }
  return buffer;
};

function serialize(coax, vorterx) {
  if (coax.key) {
    coax.id = coax.key.id;
    coax.isSelf = coax.key.fromMe;
    coax.from = decodeJid(coax.key.remoteJid);
    coax.isGroup = coax.from.endsWith('@g.us');
    coax.sender = coax.isGroup ? decodeJid(coax.key.participant) : coax.isSelf ? decodeJid(vorterx.user.id) : coax.from;
  }
  if (coax.message) {
    coax.type = getContentType(coax.message);
    if (coax.type === 'ephemeralMessage') {
      coax.message = coax.message[coax.type].message;
      const tipe = Object.keys(coax.message)[0];
      coax.type = tipe;
      if (tipe === 'viewOnceMessageV2') {
        coax.message = coax.message[tipe].message;
        coax.type = getContentType(coax.message);
      }
    }
    if (coax.type === 'viewOnceMessageV2') {
      coax.message = coax.message[coax.type].message;
      coax.type = getContentType(coax.message);
    }
    coax.messageTypes = (type) => ['videoMessage', 'imageMessage'].includes(type);
    try {
      const quoted = coax.message[coax.type]?.contextInfo;
      if (quoted.quotedMessage['ephemeralMessage']) {
        const tipe = Object.keys(quoted.quotedMessage.ephemeralMessage.message)[0];
        if (tipe === 'viewOnceMessageV2') {
          coax.quoted = {
            type: 'view_once',
            stanzaId: quoted.stanzaId,
            participant: decodeJid(quoted.participant),
            message: quoted.quotedMessage.ephemeralMessage.message.viewOnceMessage.message,
          };
        } else {
          coax.quoted = {
            type: 'ephemeral',
            stanzaId: quoted.stanzaId,
            participant: decodeJid(quoted.participant),
            message: quoted.quotedMessage.ephemeralMessage.message,
          };
        }
      } else if (quoted.quotedMessage['viewOnceMessageV2']) {
        coax.quoted = {
          type: 'view_once',
          stanzaId: quoted.stanzaId,
          participant: decodeJid(quoted.participant),
          message: quoted.quotedMessage.viewOnceMessage.message,
        };
      } else {
        coax.quoted = {
          type: 'normal',
          stanzaId: quoted.stanzaId,
          participant: decodeJid(quoted.participant),
          message: quoted.quotedMessage,
        };
      }
      coax.quoted.isSelf = coax.quoted.participant === decodeJid(vorterx.user.id);
      coax.quoted.mtype = Object.keys(coax.quoted.message).filter(
        (v) => v.includes('Message') || v.includes('conversation')
      )[0];
      coax.quoted.text =
        coax.quoted.message[coax.quoted.mtype]?.text ||
        coax.quoted.message[coax.quoted.mtype]?.description ||
        coax.quoted.message[coax.quoted.mtype]?.caption ||
        coax.quoted.message[coax.quoted.mtype]?.hydratedTemplate?.hydratedContentText ||
        coax.quoted.message[coax.quoted.mtype] ||
        '';
      coax.quoted.key = {
        id: coax.quoted.stanzaId,
        fromMe: coax.quoted.isSelf,
        remoteJid: coax.from,
      };
      coax.quoted.download = () => downloadMedia(coax.quoted.message);
    } catch {
      coax.quoted = null;
    }
    coax.body =
      coax.message?.conversation ||
      coax.message?.[coax.type]?.text ||
      coax.message?.[coax.type]?.caption ||
      (coax.type === 'listResponseMessage' && coax.message?.[coax.type]?.singleSelectReply?.selectedRowId) ||
      (coax.type === 'buttonsResponseMessage' && coax.message?.[coax.type]?.selectedButtonId) ||
      (coax.type === 'templateButtonReplyMessage' && coax.message?.[coax.type]?.selectedId) ||
      '';
    coax.reply = (text) => vorterx.sendMessage(coax.from, { text }, { quoted: coax });
    coax.mentions = [];
    if (coax.quoted?.participant) coax.mentions.push(coax.quoted.participant);
    const array = coax?.message?.[coax.type]?.contextInfo?.mentionedJid || [];
    coax.mentions.push(...array.filter(Boolean));
    coax.download = () => downloadMedia(coax.message);
  }
  return coax;
}

module.exports = {
  serialize,
  decodeJid,
};
      
