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

    const printBoard = (userId, message) => {
      const game = activeGames.get(userId);
      const emojiBoard = game.board.map(row => row.map(cell => getEmojiForPlayer(cell)).join(' | ')).join('\n');
      react(userId, `${message}\n${emojiBoard}`);
    };

    const getEmojiForPlayer = (player) => {
      switch (player) {
        case 1:
          return '🔴'; 
        default:
          return '⚪'; 
      }
    };

    const createBoard = (rows, columns) => {
      const board = [];
      for (let i = 0; i < rows; i++) {
        board.push(Array(columns).fill(0));
      }
      return board;
    };

    if (!activeGames.has(userId)) {
      const gameId = userId;
      activeGames.set(userId, { board: createBoard(6, 7), currentPlayer: 1 });
      await react('🎮', userId);
      printBoard(userId, 'Game started! Make your moves by typing column numbers (1-7).');
    } else {
      const game = activeGames.get(userId);

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

      const switchPlayer = () => {
        game.currentPlayer = game.currentPlayer === 1 ? 2 : 1;
      };

      const column = await askForMove();
      const row = dropPiece(column);

      if (row === -1) {
        printBoard(userId, '_..Column is full. Choose another column..._');
      } else {
        printBoard(userId, 'Move successful. Waiting for the other player...');
        switchPlayer();
      }
    }
  }
);
        
