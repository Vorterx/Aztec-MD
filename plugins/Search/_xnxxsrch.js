const { Zenith } = require('../../lib/functions.js');
const prefix = process.env.PREFIX;

Zenith(
  {
    usage: "xnxxsh",
    desc: "18+ videos only",
    category: "Downloads",
    filename: __filename,
  },
  async (vorterx, m, react, { args }) => {

    if (!args) {
      await react("❌");
      return m.reply("Please provide a search term.");
    }
    const axios = require('axios');

    const xnxx_vid = `https://raganork-network.vercel.app/api/xvideos/search?query=${args}`;

    try {
      const response = await axios.get(xnxx_vid);

      if (response.data && response.data.result.length > 0) {
        const pollOptions = [
       //   `*XNXX DOWNLOADER*`;
          ...response.data.result.slice(1, 11).map((result, index) => (
            `*Title*: ${result.title}`
          ))
        ];

        const options = Array.from({ length: 10 }, (_, index) => `${prefix}xnxxdn ${response.data.result[index + 1].url}`);
        console.log(options);

        const getIndex = await vorterx.sendMessage(m.chat, { type: 'poll', poll: { name: pollOptions, values: options, selectableCount: 1 } });

        if (getIndex !== undefined && getIndex !== null && getIndex >= 0 && getIndex < 10) {
          const selectedVideoUrl = response.data.result[getIndex + 1].url;
          const downloadCommand = `${prefix}xnxxdn ${selectedVideoUrl}`;
          console.log(downloadCommand);

        }
      } else {
        return m.reply(":x: No results found.");
      }
    } catch (error) {
      console.error(error);
      return m.reply(":warning: An error occurred while fetching the data.");
    }
  }
);
      
