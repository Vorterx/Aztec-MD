// BY VORTERX
// @DiegosonTech

const axios = require("axios");

module.exports = {
  name: "gpt",
  alias: ["ai", "openai", "chatgpt"],
  category: "CHATGPT",
  description: "Randomly search",
  async client(vorterx, m, { text, connect, args }) {
    if (!text) {
      await connect("❌");
      return m.reply(`*Provide me a query, e.g., "Who made Aztec?"`);
    }

    try {
      const response = await axios.get(
        `https://api.neoxr.eu/api/gpt?q=${encodeURIComponent(text)}`
      );
      const result = response.data;
      const aiTurbo = result.result;

      const exGpt = {
        text: aiTurbo,
        contextInfo: {
          externalAdReply: {
            title: "GPT TURBO 3.5K",
            mediaType: 1,
            mediaUrl: "",
            sourceUrl: "",
            showAdAttribution: true,
            thumbnail:
              "https://i.ibb.co/9bfjPyH/1-t-Y7-MK1-O-S4eq-YJ0-Ub4irg.png",
            renderLarger: true,
          },
        },
      };

      await vorterx.sendMessage(m.from, exGpt, { quoted: m });
      await connect("✅");
    } catch (error) {
      console.error(error.response.data);
      await connect("❌");
      return m.reply("An error occurred while processing the request.");
    }
  },
};
