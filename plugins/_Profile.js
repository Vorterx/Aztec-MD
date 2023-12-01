const Levels = require("discord-xp");

module.exports = {
  name: '(profile|me|user)',
  description: 'Check your profile information',
  category: 'Misc',
  async xstart(vorterx, m, { args, xReact }) {
   
    await xReact('👤');
    const user = m.sender.user;
    const bio = await vorterx.fetchBio(user);
    const bioText = bio;

    const userLevel = await Levels.fetch(user.id, true);
    const levelPoints = userLevel.level;
    let role = '';

    if (levelPoints <= 5) role = '🍥 Naruto Uzumaki';
    else if (levelPoints <= 10) role = '🐉 Son Goku';
    else if (levelPoints <= 20) role = '⚡️ Ichigo Kurosaki';
    else if (levelPoints <= 30) role = '👑 Monkey D. Luffy';
    else if (levelPoints <= 40) role = '🔥 Natsu Dragneel';
    else if (levelPoints <= 50) role = '🌸 Sailor Moon';
    else if (levelPoints <= 60) role = '💫 Edward Elric';
    else role = '🌟 Light Yagami';

    const txt = userLevel.xp;
    const mssG = `
〄P R O F  I L E : D E S C\n\n
*👤 User Number*: ${m.sender.user.replace(/@c.us/g, '')}
*👥 Username*: ${m.pushName}
*⚡ Bio*: ${bioText}
*🧩 Role*: ${role}
*🍁 Level*: ${userLevel.level}
*📥 Total Messages*: ${txt}
`;

    let profileImage;
    try { profileImage = await vorterx.profilePictureUrl(user.id, 'image');
    } catch (e) {}
    
    const getColor = () => {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    };
    
    const mSg = {
      image: { url: profileImage, animated: false }, caption: mssG, headerType: 4,
      headerColor: getColor(),
    };
    
    const animatedPlp = await vorterx.loadProfilePicture(user.id, 'image');
    mSg.image.animated = animatedPlp.isAnimated;
    vorterx.sendMessage(m.from, mSg, { quoted: m });
  },
};
