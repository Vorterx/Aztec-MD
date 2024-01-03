const { Zenith } = require('../../lib/functions.js');

Zenith(
  {
    usage: "xnxxsh",
    desc: "18+ videos only",
    category: "Downloads",
    filename: __filename,
  },
  async (vorterx, coax, react, { args }) => {

    if (!args) {
      await react("❌");
      return coax.reply("Please provide a search term.");
    }
    const axios = require('axios');

    const xnxx_vid = `https://raganork-network.vercel.app/api/xvideos/search?query=${args}`;

    try {
      const response = await axios.get(xnxx_vid);

      if (response.data && response.data.result.length > 0) {
        const pollOptions = [
          `*XNXX DOWNLOADER*\n*TITLE*: ${response.data.result[0].title}`, 
          ...response.data.result.slice(1, 11).map((result, index) => (
            `*VIDEO ${index + 1}*\n*Title*: ${result.title}`
          ))
        ];

        const options = Array.from({ length: 10 }, (_, index) => `${prefix}xnxxdn${response.data.result[index + 1].url} VIDEO ${index + 1}`);
        console.log(options);

        const getIndex = await vorterx.sendMessage(coax.from, { type: 'poll', poll: { name: pollOptions, values: options, selectableCount: 1 } });

        if (getIndex !== undefined && getIndex !== null && getIndex >= 0 && getIndex < 10) {
          const selectedVideoUrl = response.data.result[getIndex + 1].url;
          const downloadCommand = `${prefix}xnxxdn${selectedVideoUrl} VIDEO ${getIndex + 1}`;
          console.log(downloadCommand);

        }
      } else {
        return coax.reply(":x: No results found.");
      }
    } catch (error) {
      console.error(error);
      return coax.reply(":warning: An error occurred while fetching the data.");
    }
  }
);
      
