const fetch = async (url) => import('node-fetch').then(module => module.default(url));
const { getBuffer } = require('../../lib/_getBuffer.js');

module.exports = {
  name: "gpt",
  alias: ["ai", "openai", "chatgpt"],
  category: "GPT AI",
  description: "Randomly search",
  async client(vorterx, m, { connect, args }) {
  
    if (!args) {
      await connect("❌");
      return m.reply(`*Provide me a query, e.g., "Who made Aztec?"`);
    }

    const gpt_api = `https://api.caliph.biz.id/api/ai/oai-gpt?q=${encodeURIComponent(args)}&apikey=lykoUzNh`;

    const res = await fetch(gpt_api);
    const result = await res.json();

    if (result.status === "success") {
      await connect("💡");
      m.reply(result.data);

       await vorterx.sendMessage(m.from, {
        text: result.data,
        image: { url: "https://i.ibb.co/9bfjPyH/1-t-Y7-MK1-O-S4eq-YJ0-Ub4irg.png" },
        contextInfo: {
          externalAdReply: {
            title: "GPT TURBO 3.5K",
            body: "",
            mediaType: 1,
            thumbnail: await getBuffer("https://i.ibb.co/9bfjPyH/1-t-Y7-MK1-O-S4eq-YJ0-Ub4irg.png"),
            mediaUrl: "",
            sourceUrl: "",            
          },
        },
      });
    } else {
      await connect("❌");
      m.reply(`Error: ${result.message}`);
    }
  }
};
