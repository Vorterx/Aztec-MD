/*
* @Author: DiegosonTech
* @BotName: Aztec-MD
*/

const igs = require('api-dylux');

module.exports = {
  name: 'igstalk',
  category: 'Search',
  async client(vorterx, m, { args, connect }) {
    
    if (!args[0]) {
      await connect('❌');
      return m.reply('Please provide an Instagram username (e.g., @diegoson)');
    }

    await connect('✔️');
    const userData = await igs.igStalk(args[0]);

    const instaInfo = `
⭐️ *INSTAGRAM STALKER* ⭐️

*Name:* ${userData.name} 
*Username:* ${userData.username}
*Followers:* ${userData.followersH}
*Following:* ${userData.followingH}
*Bio:* ${userData.description}
*Posts:* ${userData.postsH}
*Profile Link:* [Instagram](https://instagram.com/${userData.username.replace(/^@/, '')})
`;

    const getInfo = instaInfo.split('\n').map(line => `║ ${line}`).join('\n');
    const digo = `
╔════════════════════════╗
${getInfo}
╚════════════════════════╝
`;

    await vorterx.sendMessage(m.from, { image: { url: userData.profilePic }, caption: diego }, { quoted: m });
  }
};
      
