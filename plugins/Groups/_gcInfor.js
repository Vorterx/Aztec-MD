const { Zenith } = require('../../lib/functions');
const moment = require('moment-timezone');
const config = require('../../config');

Zenith({
    usage: 'gcinfo',
    desc: 'Shows group information',
    category: 'Group',
}, async (vorterx, m, react, { participants, groupAdmins, gcMeta, gcName }) => {

    await react('📇');
    var get_cc = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60';

    var get_invite = null;
    try {
        get_cc = await vorterx.profilePictureUrl(m.chat, 'image');
        get_invite = await vorterx.groupInviteCode(m.chat);
    } catch (error) {
        console.error(error);
    }

    var MADEDate = moment(gcMeta.creation * 1000).tz('Africa/Johannesburg').format('MMMM D, YYYY [at] h:mm A');

    var get_infor = ` *乂 GROUP GC INFO 乂*\n\n` +
`*〄 NAME:* ${gcName}\n` +
`*〄 GC ID:* ${m.chat}\n` +
`*〄 MADE AT:* ${MADEDate}\n` +
`*〄 GC OWNER:* @${gcMeta.owner.split('@')[0]}\n` +
`*〄 ADMINS:* ${groupAdmins.length}\n` +
`*〄 MEMBERS:* ${participants.length}\n\n` +
`*〄 DESC:*\n${gcMeta.desc}\n\n*${config.CAPTION}*`;

    vorterx.sendMessage(m.chat, { image: { url: get_cc }, caption: get_infor, mentions: [gcMeta.owner] }, { quoted: m });
});
