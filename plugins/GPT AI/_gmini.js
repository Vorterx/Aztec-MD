const { GoogleGenerativeAI } = require("@google/generative-ai");
const apiKey = "AIzaSyAlvaQ_Jv86iNnQlcyHYH0S3XXoqBw0HKs";
const genAI = new GoogleGenerativeAI(apiKey);

module.exports = {
  name: 'gemini',
  category: 'GPT AI',
  async client(vorterx, m, { args, quoted, mime, connect }) {
    if (!quoted) {
      await connect('❌');
      return m.reply('Please Reply to an image or video...');
    }
    if (!/image/.test(mime)) {
      await connect('❌');
      return m.reply('Reply to the video or an image...');
    }

    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

    try {
      const result = await model.generateContent([`${args}`, { inlineData: { data: await quoted.download(), mimeType: mime } }]);
      const getGeni = (await result.response).args();
      m.reply(`${getGeni}`);
    } catch (error) {
      console.error(error);
      m.reply(`${error.message}`);
    }
  },
};
