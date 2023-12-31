const { Zenith } = require('../../lib/functions.js');
const activeGames = new Map();

Zenith(
  {
    usage: 'connectfour',
    category: 'GAMES 3D',
    desc: 'Connect Four Game - Type "Join" to start a new game.',
    filename: __filename,
  },
  async (vorterx, coax, react, { args }) => {
    
    const userId = coax.sender;
    if (args && args[0] && args[0].toLowerCase() === 'join') {
      if (activeGames.has(userId)) {
        coax.reply('You are already in a game. Wait for the other player to make a move.');
      } else {
        const gameId = userId;
        activeGames.set(userId, { board: createBoard(6, 7), currentPlayer: 1 });
        coax.reply('Joined the game! Waiting for the other player...');
      }
    } else {
      if (!activeGames.has(userId)) {
        coax.reply('No active game. Type "Join" to start a new game.');
      } else {
        const game = activeGames.get(userId);

        const printBoard = () => {
          const emojiBoard = game.board.map(row => row.map(cell => getEmojiForPlayer(cell)).join(' | ')).join('\n');
          coax.reply(emojiBoard);
        };

        const getEmojiForPlayer = (player) => {
          switch (player) {
            case 1:
              return '🟥'; 
            case 2:
              return '🔵'; 
            default:
              return '🟡'; 
          }
        };

        const askForMove = async () => {
          const msg = `Player ${game.currentPlayer}, choose a column (1-7): `;
          const res = await coax.ask(msg);
          return parseInt(res, 10) - 1; 
        };

        const dropPiece = (column) => {
          for (let i = 5; i >= 0; i--) {
            if (game.board[i][column] === 0) {
              game.board[i][column] = game.currentPlayer;
              return i;
            }
          }
          return -1;
        };

        const checkWin = (row, col) => {
      
    };

        const isBoardFull = () => {
          return game.board.every(row => row.every(cell => cell !== 0));
        };

        const switchPlayer = () => {
          game.currentPlayer = game.currentPlayer === 1 ? 2 : 1;
        };

        const column = await askForMove();
        const row = dropPiece(column);

        if (row === -1) {
          coax.reply('_..Column is full. Choose another column_...');
        } else {
         if (checkWin(row, column)) {
            printBoard();
            coax.reply(`Player ${game.currentPlayer} wins!`);
            activeGames.delete(userId);
          } else if (isBoardFull()) {
            printBoard();
            coax.reply('It\'s a draw!');
            activeGames.delete(userId);
          } else {
            switchPlayer();
            printBoard();
            coax.reply('Move successful. Waiting for the other player...');
          }
        }
      }
    }
  }
);
