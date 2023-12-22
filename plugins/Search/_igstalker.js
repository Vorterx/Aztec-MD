const fetch = async (url) => import('node-fetch').then(module => module.default(url));

module.exports = {
  name: 'igstalk',
  category: 'Search',
  description: 'To get user information on Instagram',
  async client(vorterx, m, { text, args, connect }) {
    
    if (!text) {
      await connect('❌');
      return m.reply('Provide a valid Instagram username');
    }

    const insta_stalk = `https://api.caliph.biz.id/api/igstalk?username=${text}&apikey=lykoUzNh`;
    const anu = await fetch(insta_stalk);
    if (anu.ok) {
      const userData = await anu.json();

      if (!userData || !userData.username) {
        return m.reply('Invalid Instagram username...');
      }

      await connect('✔️');
      const get_user =
        '*Instagram Stalker*:\n' +
        '*Username*: ' + userData.username + '\n' +
        '*Full Name*: ' + userData.full_name + '\n' +
        '*Total Posts*: ' + userData.total_posts + '\n' +
        '*Bio*: ' + userData.bio  + '\n' +
        '*Pronouns*: ' + userData.pronouns;

        const getPP = userData.profile_pic_url || '';
        vorterx.sendMessage(m.from, { image: { url: getPP }, caption: get_user });
    } else {
      console.error('Error:', anu.status);
      return m.reply('Please try again later...');
    }
  },
};
