const axios = require('axios');

async function MOD_SHORTEN(url) {
  if (!url) return false;
  let res = await axios.post('https://cleanuri.com/api/v1/shorten', { url: url });
  return res.data.result_url;
};
module.exports = { MOD_SHORTEN };
