const fs = require('fs');
let usageData = {
  groups: 0,
  privateChats: 0,
  totalUsers: 0,
  users: []
};

let chatsData = [];
Zenith({
  usage: 'usage',
  desc: 'To check how many users have used the Aztec-MD bot',
  category: 'Owner',
}, async (vorterx, m, react, { args }) => {
 
  await react('💻');
 const _VOTE = /@whatsapp\.net$/;
  const CHATS = _VOTE.test(m.chat);
  if (CHATS) {
    usageData.privateChats += 1;
  } else {
    usageData.groups += 1;
  }

  const _MEMBERS = m.pushName;
    if (!usageData.users.includes(_MEMBERS)) {
        usageData.totalUsers += 1;
       usageData.users.push(_MEMBERS);
  }

  const _USAGE_INFOR = {
    _USAGE_INFOR: m.chat,
    CHATS,
    _MEMBERS,
    timestamp: Date.now()
  };
  chatsData.push(_USAGE_INFOR);
  saveUsageData();
      saveChatsData();

  vorterx.sendMessage(m.chat, {text: `*💻 Group Chats*: ${usageData.groups}\n*Private Chats*: ${usageData.privateChats}\n*Total Users*: ${usageData.totalUsers}`});
});

function SAVE_DATA() {
  const json_DATA = JSON.stringify(usageData, null, 2);
  fs.writeFileSync('../../lib/_dbase/usage.json', json_DATA, 'utf8');
}

function SAVE_DATA() {
  const json_DATA = JSON.stringify(chatsData, null, 2);
  fs.writeFileSync('../../lib/_dbase/chats.json', json_DATA, 'utf8');
}
