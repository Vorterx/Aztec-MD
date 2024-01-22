const {Zenith } = require('../..lib/functions');

Zenith({ usage: 'countdown', desc: 'Spooky countdown prank', category: 'Prank' }, async (vorterx, m, react) => {
 
  m.edit('👻 Initiating Spooky Countdown...');
   await react('🤐');
  for (let i = 10; i >= 0; i--) {
    await sleep(2000); 

    if (i > 0) {
      m.edit(`⏳ ${i}...`);
    } else {
      m.edit('💀 Boo! Spooky countdown complete👻');
      await sleep(1500); 
      m.edit('🕷️ Surprise! A spider crawls across your screen! 🕷️');
      await sleep(2000); 
      m.edit('😱 Just kidding! Happy 2024 😂😂😂..omg');
    }
  }
});
