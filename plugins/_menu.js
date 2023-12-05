const config = require('../config.js');
const { tiny } = require("@viper-x/fancytext");
const fs = require("fs");

module.exports = {
  name: 'menu',
  alias: ['h', 'help'],
  category: 'General',
  description: 'Reveals menu categories commands',

  async client(vorterx, m, { args, connect }) {

    await connect('Ⓜ️');

    const getCommands = `
┌──『 General 』──❖
|  
|
|
└─────────◉
┌──『 Chatgpt 』──❖
                        
|
└─────────◉
┌──『 Downloads 』──❖
|  
|
|
└─────────◉
┌──『 Mics 』──❖
|  
|
|
└─────────◉
┌──『 Extra 』──❖
|  
|
|
└─────────◉

┌──『 Group 』──❖
|  
|
|
└─────────◉
┌──『 Owner 』──❖
|  
|
|
└─────────◉\n\n*WHATSAPP CHATBOT*`;
    
    let up_up, up_mid, up_btm;
    up_up = `┏━━⟪ *${tiny(process.env.BOTNAME)}* ⟫━━⦿`;
    up_mid = `┃ ✗`;
    up_btm = `┗━━━━━━━━━━━━━━⦿`;
    
    let amarok = `${up_up}
${up_mid} User: ${tiny(m.pushname)}
${up_mid} Botname: ${tiny(process.env.BOTNAME)}
${up_mid} Prefix: ${tiny(process.env.PREFIX)}
${up_mid} Runtime: ${tiny(process.uptime())} seconds
${up_mid} Time: ${tiny(new Date().toLocaleTimeString())}
${up_mid} Date: ${tiny(new Date().toLocaleDateString())}
${up_btm}\n\n${getCommands}`;

    await vorterx.sendMessage(m.from, { image: { url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8IoKEDdsbryDr8GQr6gqFjgQh0APPLZsmnLuK-2_GnA&s" }, caption: tiny(amarok) }, { quoted: m });
    }
}
