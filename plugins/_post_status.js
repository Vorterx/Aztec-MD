const { create, Client } = require('@whiskeysockets/baileys');

module.exports = {
  name: 'post',
  alias: ['st'],
  category: 'Owner',
  description: 'To post on your WhatsApp status',
  async client(vorterx, m, { text, mime, quoted, connect }) {
  
    try {
       if (m.sender.split('@')[0] !== process.env.MODS) {
        await connect('❌');
        return m.reply('This command can only be used by the owner.');
      }

      if (!text && !quoted) {
        await connect('❌');
        return m.reply('Please mention a video/image or add text to post.');
      }

      let content = '';
      if (text) {
        content += text;
      }

      const media = m.quoted && m.quoted.mimetype ? m.quoted : m;
      const client = create(new Client());
      await client.connect();

      if (media.mimetype.includes('image')) {
        await client.sendImageStatus(media.content, content);
      } else if (media.mimetype.includes('video')) {
        await client.sendVideoStatus(media.content, content);
      } else {
        await client.sendTextStatus(content);
      }

      await client.close();

      await connect('💌');
      return m.reply('✔️ Status has been posted successfully');
    } catch (error) {
      console.error('Failed to post status:', error);
      m.reply('*Failed to post status. Please try again later.*');
    }
  },
};
