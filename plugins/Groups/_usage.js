const fs = require('fs');
const { Zenith } = require('../../lib/functions');

let USEG_DATA = {
  groups: 0,
  privateChats: 0,
  totalUsers: 0,
  users: []
};
let CHATS_DETO = [];
Zenith({
  usage: 'usage',
  desc: 'To check how many users have used the Aztec-MD bot',
  category: 'Owner',
}, async (vorterx, m, react, { args }) => {
 
  await react('💻');
 const _VOTE = /@whatsapp\.net$/;
  const CHATS = _VOTE.test(m.chat);
  if (CHATS) {
    USEG_DATA.privateChats += 1;
  } else {
    USEG_DATA.groups += 1;
  }

  const _MEMBERS = m.pushName;
    if (!USEG_DATA.users.includes(_MEMBERS)) {
        USEG_DATA.totalUsers += 1;
       USEG_DATA.users.push(_MEMBERS);
  }

  const _USAGE_INFOR = {
    _USAGE_INFOR: m.chat,
    CHATS,
    _MEMBERS,
    timestamp: Date.now()
  };
  CHATS_DETO.push(_USAGE_INFOR);
  SAVE_DATA();
      SAVE_DATA();

  vorterx.sendMessage(m.chat, {text: `*💻 Group Chats*: ${USEG_DATA.groups}\n*Private Chats*: ${USEG_DATA.privateChats}\n*Total Users*: ${USEG_DATA.totalUsers}`});
});

function SAVE_DATA() {
  const json_DATA = JSON.stringify(USEG_DATA, null, 2);
  fs.writeFileSync('../../lib/_dbase/usage.json', json_DATA, 'utf8');
}
function SAVE_DATA() {
     const json_DATA = JSON.stringify(USEG_DATA, null, 2);
   fs.writeFileSync('../../lib/_dbase/chats.json', json_DATA, 'utf8');
}
