const { Zenith } = require('../../lib/functions');

Zenith({
  usage: 'gitclone',
  desc: 'To download GitHub repo',
  category: 'Downloads',
}, async (vorterx, m, react, { args, mime, quoted }) => {
 
  if (args.length !== 1) {
    await react('❌');
    return m.reply('*_Please provide the GitHub username and repository_*');
  }

  await react('📤');
  const [repository] = args;
  const branch = 'main';
  const THEN_URL = `https://github.com/${repository}/archive/refs/heads/${branch}.zip`;

  vorterx.sendMessage(m.chat, { document: THEN_URL, filename: `${repository} ${branch}.zip` }, { quoted: m });
});
      
