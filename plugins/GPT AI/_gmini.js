        
//
const { GoogleGenerativeAI } = require("@google/generative-ai");
const apiKey = "AIzaSyBPv4OM4uBGbSJcX5tEb6SobkNc6qwMdec";
const genAI = new GoogleGenerativeAI(apiKey);

module.exports = {
  name: 'gemini',
  category: 'GPT AI',
  async client(vorterx, m, { args, quoted, mime, connect }) {
    if (!quoted) {
      return m.reply(`Where is the picture?`);
    }

    if (!/image/.test(mime)) {
      return m.reply(`Send/Reply Photo`);
    }

    try {
      const prompt = `${args}`;
      const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
      const media = await quoted.download();

      const imagePart = {
        inlineData: {
          data: Buffer.from(media).toString("base64"),
          mimeType: mime
        },
      };

      const result = await model.generateContent([prompt, imagePart]);
      const rawResponse = await result.response.text();

      try {
        const response = JSON.parse(rawResponse);
        const textt = response.args();
        m.reply(`${textt}`);
      } catch (jsonError) {
        console.error('Error parsing JSON:', jsonError);
        m.reply('An error occurred while processing the response.');
      }
    } catch (error) {
      console.error('Error in Gemini Pro Vision:', error);
      m.reply(`An error occurred: ${error.message}`);
    }
  },
};
