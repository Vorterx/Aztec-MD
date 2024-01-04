/*const { Zenith } = require('../../lib/functions.js');

Zenith({ usage: 'number-guess', desc: 'Guess the correct number', category: 'GAMES 3D' }, async (vorterx,coax,react) => {
  const minNum = 0;
  const maxNum = 200000;
  const maxAttempts = 7;
  const pointsPerGuess = 50;

  const get_rand = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
  let attempts = 0;
  let playerPoints = 0;

  const guessesTable = [];
  const displayTable = () => {
    const header = '| Attempt | Guess | Result | Points Earned | Total Points |';
    const divider = '|---------|-------|--------|---------------|--------------|';
    const rows = guessesTable.map(({ attempt, guess, result, points }) => `|   ${attempt}    |   ${guess}   |  ${result}  |      ${points}      |      ${playerPoints}      |`);  
    return `\`\`\`${header}\n${divider}\n${rows.join('\n')}\n${divider}\`\`\``;
  };

  vorterx.sendMessage(coax.from, { text: `Guess the number between ${minNum} and ${maxNum}. You have ${maxAttempts} attempts.`});

  const collector = coax.createMessageCollector({
    time: 60000,
    max: 1,
  });

  collector.on('collect', async (message) => {
    const userGuess = parseInt(message.content);
    if (isNaN(userGuess) || userGuess < minNum || userGuess > maxNum) {
      await react('❌'); 
      await coax.reply(message, `Invalid guess! Please enter a number between ${minNum} and ${maxNum}.`);
      return;
    }

    attempts++;
    const result = userGuess === get_rand ? 'Correct' : (userGuess < get_rand ? 'Too low' : 'Too high');
    const earnedPoints = userGuess === get_rand ? pointsPerGuess * (maxAttempts - attempts + 1) : 0;
    playerPoints += earnedPoints;
    guessesTable.push({ attempt: attempts, guess: userGuess, result: result, points: earnedPoints });

    await coax.reply(message, displayTable());

    if (userGuess === get_rand) {
      await react('🎉');
      await coax.reply(message, `Congratulations! You guessed the correct number in ${attempts} attempt(s). Earned ${earnedPoints} points.`);
      await coax.reply(message, `Total Points: ${playerPoints}`);
      collector.stop();
    } else {
      react(userGuess < get_rand ? '⬆️' : '⬇️');
      await coax.reply(message, `You have ${maxAttempts - attempts} attempt(s) remaining.`);
    }

    if (attempts === maxAttempts) {
      await coax.reply(message, `The correct number was ${get_rand}. Game over!`);
      collector.stop();
    }
  });
});*/
       
