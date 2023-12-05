const { getDevice } = require('@whiskeysockets/baileys');

module.exports = {
  name: 'device',
  category: 'Search',
  description: 'Check the user device being used',
  async client(vorterx, m, { quoted, connect }) {
   
    try {
      await connect('❌');
      if (!quoted && !m.mentionedJid) {
        return m.reply('_Please reply to someone to get their device information._');
      }

      await connect('📱');
      const deviceId = quoted ? quoted.id : m.key.id;
      const deviceInfo = await getDevice(deviceId);
      const userMention = `USER: @${m.mentionedJid || m.sender.id}`;
      const device = `DEVICE: ${deviceInfo}`;
      
      const replyMsg = `${userMention}\n${device}`;
      const imageUrl = 'https://graph.org/file/1c594cbc8d4c25046b803.jpg';
      
      vorterx.sendMessage(m.from, {
        image: { url: imageUrl },
        caption: replyMsg
      });
    } catch (error) {
      console.error(error);
      m.reply('_An error occurred while retrieving device information._');
    }
  }
};
