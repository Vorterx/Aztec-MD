const { GoogleGenerativeAI } = require("@google/generative-ai");
const apiKey = "AIzaSyAlvaQ_Jv86iNnQlcyHYH0S3XXoqBw0HKs";
const genAI = new GoogleGenerativeAI(apiKey);

module.exports = {
  name: 'gemini',
  category: 'GPT AI',
  async client(vorterx, m, { args, quoted, connect }) {
    if (!quoted) {
      await connect('❌');
      return m.reply('Please Reply to an image or video...');
    }

    try {
      const media = await quoted.download();
      const mediaType = quoted.mimetype;

      if (mediaType.includes('image') || mediaType.includes('video')) {
        const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
        const result = await model.generateContent([`${args}`, { inlineData: { data: Buffer.from(media).toString("base64"), mimeType: mediaType } }]);
        const getGeni = (await result.response).args();

   await vorterx.sendMessage(m.from, getGeni, { quoted: m });
      } else {
        await connect('❌');
        m.reply('Reply to the video or an image...');
      }
    } catch (error) {
      console.error(error);
      await connect('❌');
      m.reply(${error.message}`);
    }
  },
};
      
