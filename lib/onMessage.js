/*
* @Author: DiegosonTech
* @BotName: Aztec-MD
*/

const util = require('util');

function onMessage(vorterx, callback) {
  vorterx.on('message', async (message) => {
    try {
    await callback(message);
    } catch (error) {
      console.error('Error processing message:', error);
    }
  });
}

module.exports = {
  onMessage,
};
