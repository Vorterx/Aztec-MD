const { GoogleGenerativeAI } = require("@google/generative-ai");
const apiKey = "AIzaSyAlvaQ_Jv86iNnQlcyHYH0S3XXoqBw0HKs";
const genAI = new GoogleGenerativeAI(apiKey);

module.exports = {
  name: 'gemini',
  category: 'GPT AI',
  async client(vorterx, m, { args, quoted, mime, connect }) {
    if (!quoted) return m.reply(`Where is the picture?`);
    if (!/image/.test(mime)) return m.reply(`Send/Reply Photos`);

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
        const response = await result.response;

        console.log('API Response:', response);

        const textt = await response.args();

                m.reply(`${textt}`);
    } catch (error) {
        console.error('Error in Gemini Pro Vision:', error);

                console.error(error);

        m.reply(`An error occurred: ${error.message}`);
    }
  },
};
