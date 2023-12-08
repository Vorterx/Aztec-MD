const Jimp = require('jimp');
const fs = require('fs');

module.exports = {
  name: 'gcfullp',
  description: 'Set group full picture dp',
  category: 'Group',
  async client(vorterx, m, { isAdmin, isBotAdmin, mime, connect, text, quoted, args }) {
   
    if (!isAdmin) {
    await connect("❌");
    return m.reply(`\`\`\`This command is for admins\`\`\``);
   }
        if (!isBotAdmin) {
          await connect("❌");
          return m.reply(`Imm not an admin sorry_____`);
        }

        if (!/image/.test(mime)) {
          await connect("❌");
          return vorterx.sendMessage(m.from,{text: 'Reply to a picture please'},{ quoted: m });
        }
        await connect("🥊");
        let quotedimage = await vorterx.downloadAndSaveMediaMessage(quoted);
        var { preview } = await generatePP(quotedimage);

        await vorterx.query({
          tag: "iq",
          attrs: {
            to: m.from,
            type: "set",
            xmlns: "w:profile:picture",
          },
          content: [
            {
              tag: "picture",
              attrs: { type: "image" },
              content: preview,
            },
          ],
        });
        fs.unlinkSync(quotedimage);

        ppgc = await vorterx.profilePictureUrl(m.from, "image");

        vorterx.sendMessage(
          m.from,
          {
            image: { url: ppgc },
            caption: 'Group Profile Picture has been updated'}
               },
          { quoted: m }
        );
    
