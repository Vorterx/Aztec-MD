//
const fetch = require('node-fetch');
const config = require('../../config.js');

async function getRepo(args) {
  const regex = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i;
  return regex.test(args) ? args.match(regex) : null;
}

async function fetchGit(user, repo) {
  const url = `https://api.github.com/repos/${user}/${repo}/zipball`;
  const res = await fetch(url, { method: 'HEAD' });
  const filename = res.headers.get('content-disposition').match(/attachment; filename=(.*)/)[1];
  return { url, filename, size: res.headers.get('content-length') };
}

module.exports = {
  name: "gitclone",
  category: "Downloads",
  async client(vorterx, m, { text, args, connect }) {
   
    if (!args) {
      await connect('❌');
      return m.reply('Please provide a git repo link...');
    }

    const userGit = await getRepo(args);
    if (!userGit) {
      await connect('❌');
      return m.reply('Give a valid repo');
    }

    const [_, user, repo] = userGit;
    
    try {
      await connect('📤');
      m.reply(`\`\`\`Please wait a sec,...⏳\`\`\``);
      const { url, filename, size } = await fetchGit(user, repo);
      const caption = `*Name*: ${filename}\n*Size*: ${size}\n\n*${config.CAPTION}*`;
      
      await vorterx.sendMessage(m.from, { document: { url }, fileName: filename, mimetype: 'application/zip', tiny(caption) });
    } catch (error) {
      console.error(error);
      await connect('❌');
      return m.reply('Failed to fetch the git repository...');
    }
  }
};
