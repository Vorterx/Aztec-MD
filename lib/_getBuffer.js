const axios = require('axios');

async function getBuffer(url) {
  try {
    const response = await axios.get(url, {
      responseType: 'arraybuffer',
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function isUrl(string) {
  const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
  return urlRegex.test(string);
}

module.exports = {
  getBuffer,
  isUrl
};
