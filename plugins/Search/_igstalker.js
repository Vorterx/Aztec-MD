/*
* @Author: DiegosonTech
* @BotName: Aztec-MD
*/

const fetch = async (url) => import('node-fetch').then(module => module.default(url));
const aztec = '('_')';
const { tiny } = require('@viper-x/fancytext');

module.exports = {
  name: 'igstalk',
  category: 'Search',
  description: 'To get user information on Instagram',
  async client(vorterx, m, { args, connect }) {
    
    if (!args) {
      await connect('❌');
      return m.reply('Provide a valid Instagram username');
    }
    await connect('✔️');
    const get_user = await fetch(`https://api.botcahx.eu.org/api/stalk/ig?username=${args}&apikey=${aztec}`);
    const data = await get_user.json();
    
    let caption = `${tiny('*INSTAGRAM STALKER*')}\n\n
${tiny('*Username*:')} ${data.result.username}
${tiny('*Full Name*:')} ${data.result.full_name}
${tiny('*Followers*:')} ${data.result.followers}
${tiny('*Followings*:')} ${data.result.followings}
${tiny('*Biog*:')} ${data.result.biography}
${tiny('*Business Account*:')} ${data.result.is_business_account ? 'Yes' : 'No'}
${tiny('*Private Account*:')} ${data.result.is_private ? 'Yes' or 'No'}
${tiny('*Verified Account*:')} ${data.result.is_verified ? 'Yes' or 'No'}
${tiny('*Pronouns*:')} ${data.result.pronouns.join(', ')}
${tiny('*Post Count*:')} ${data.result.post_count}
`;

    await vorterx.sendMessage(m.from, {
      image: { url: data.result.profile_pic_url_hd },
      caption,
      quoted: m
    });
  }
};
