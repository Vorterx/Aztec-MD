// onMessage.js

const util = require('util');

function onMessage(vorterx, callback) {
  if (vorterx && vorterx.onMessage) {
    vorterx.onMessage(async (message) => {
      try {
        await callback(message);
      } catch (error) {
        console.error('Error processing message:', error);
      }
    });
  } else {
    console.error('Unsupported or missing onMessage function in the provided vorterx object.');
  }
}

module.exports = {
  onMessage,
};
