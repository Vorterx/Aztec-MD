const fs = require('fs');
const { ImgurClient } = require('imgur');

const client = new ImgurClient({ clientId: "a0113354926015a" });
async function uploadToImgur(imagePath) {
  try {
    const res = await client.upload({
      image: fs.createReadStream(imagePath),
      type: 'stream',
    });
    const doImage = res.data.link;
    console.log(doImage);
    return doImage;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
module.exports = uploadToImgur;
