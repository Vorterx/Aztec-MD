const fetch = async (url) => import('node-fetch').then(module => module.default(url));

module.exports = {
  name: "gpt",
  alias: ["ai", "openai", "chatgpt"],
  category: "GPT AI",
  description: "Randomly search",
  async client(vorterx, m, { text, connect, args }) {
  
    if (!text) {
      await connect("❌");
      return m.reply(`*Provide me a query, e.g., "Who made Aztec?"`);
    }

    try {
      const res = await fetch(
        `https://api.neoxr.eu/api/gpt?q=${encodeURIComponent(text)}`
      );

      const data = await res.json();

      if (!data || !data.results) {
        await connect("❌");
        return m.reply("Invalid response from the API");
      }

      await vorterx.sendMessage(m.from, {
        text: data.results,
        contextInfo: {
          externalAdReply: {
            title: "GPT TURBO 3.5K",
            mediaType: 1,
            thumbnailUrl: "https://i.ibb.co/9bfjPyH/1-t-Y7-MK1-O-S4eq-YJ0-Ub4irg.png",
            renderLargerThumbnail: true,
            mediaUrl: "",
            sourceUrl: "",            
          },
        },
      }, { quoted: m });

      await connect("✅");
    } catch (error) {
      console.error(error);
      await connect("❌");
      return m.reply("An error occurred while processing the request.");
    }
  },
};