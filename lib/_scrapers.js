const axios = require('axios');

async function getJson(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
    m.reply('Error occurred while making the HTTP request.');
  }
}

module.exports = { getJson };
