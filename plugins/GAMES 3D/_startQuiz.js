const { doQuiz } = require('../../lib/client.js');

let quizInProgress = false;
module.exports = {
  name: 'startQuiz',
  alias: ['quiz'],
  category: 'GAMES 3D',
  async client(vorterx, m, { text, args, connect }) {
    
    const user = m.pushName;
    const startKeywords = ['startQuiz', 'quiz'];

    if (startKeywords.includes(args[0])) {
      if (quizInProgress) {
        await connect('😺');
        return m.reply('The quiz is already in progress...');
      } else {
        quizInProgress = true;

        try {
          await connect('7️⃣');
          const result = await doQuiz(vorterx, m);
          vorterx.sendMessage(m.from, { text: result });
        } catch (error) {
          m.reply('An error occurred during the quiz...');
          console.error(error);
        } finally {
          quizInProgress = false;
        }
      }
    } else {
      vorterx.sendMessage(m.from, { text: 'Use `startQuiz` to begin the quiz...' });
    }
  },
};
