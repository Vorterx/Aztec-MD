const fs = require('fs');
const axios = require('axios');

module.exports = {
  name: 'getpp',
  alias: ['profile'],
  description: 'Get the user profile picture',
  category: 'General',
  async client(vorterx, m,{text, mime, connect, args}) {
    if (!m.quoted) {
      await connect('❌');
      return m.reply(`*_Please Reply To A User To Get Profile Picture_*`);
    }

    await connect("👤");
    try {
      const user = m.quoted.sender;
      const userPp = await vorterx.getProfilePicture(user);
      const ca_ption = ` *PROFILE PICTURE LOADED*\n*USER*: ${m.pushName}`;
      const imageMessage = { url: userPp, caption: ca_ption, headerType: 4, };
      await vorterx.sendMessage(m.from, imageMessage, 'image', { quoted: m });
    } catch (error) {
      return m.reply("*Error occur while processing*");
    }},
  };
