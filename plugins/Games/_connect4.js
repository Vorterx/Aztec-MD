const { Zenith } = require('../../lib/functions.js');
const activeGames = new Map();

Zenith(
  {
    usage: 'connectfour',
    category: 'GAMES 3D',
    desc: 'Connect Four Game - Type "connectfour" to start a new game.',
    filename: __filename,
  },
  async (vorterx, coax, react, { args }) => {
    const userId = coax.sender;

    if (!activeGames.has(userId)) {
      const gameId = userId;
      activeGames.set(userId, { board: createBoard(6, 7), currentPlayer: 1 });
      await react('🎮', userId);
      printBoard(userId, 'Game started! Make your moves by typing column numbers (1-7).');
    } else {
      const game = activeGames.get(userId);

      const printBoard = (userId, message) => {
        const emojiBoard = game.board.map(row => row.map(cell => getEmojiForPlayer(cell)).join(' | ')).join('\n');
        coax.reply(userId, `${message}\n${emojiBoard}`);
      };

      const getEmojiForPlayer = (player) => {
        switch (player) {
          case 1:
            return '🔴'; 
          default:
            return '⚪'; 
        }
      };

      const askForMove = async () => {
        const column = await coax.ask('Choose a column (1-7): ');
        return parseInt(column, 10) - 1; 
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
  
        return false;
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
        printBoard(userId, 'Column is full. Choose another column.');
      } else {
        if (checkWin(row, column)) {
          printBoard(userId, 'Congratulations! You won!');
          activeGames.delete(userId);
        } else if (isBoardFull()) {
          printBoard(userId, 'It\'s a draw! The board is full.');
          activeGames.delete(userId);
        } else {
          switchPlayer();
          printBoard(userId, 'Move successful. Make your next move...');
        }
      }
    }
  }
);

function createBoard(rows, columns) {
  const board = [];
  for (let i = 0; i < rows; i++) {
    board.push(Array(columns).fill(0));
  }
  return board;

}
        
