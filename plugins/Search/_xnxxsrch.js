const axios = require("axios");
const { Zenith } = require('../../lib/_cmd_sxntax.js');
const prefix = process.env.PREFIX;

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

    const xnxx_vid = `https://raganork-network.vercel.app/api/xvideos/search?query=${args}`;

    try {
      const response = await axios.get(xnxx_vid);

      if (response.data && response.data.result.length > 0) {
        const pollOptions = response.data.result.slice(0, 15).map((result, index) => (
          `*xnxx ${index + 1}*\n*Title*: ${result.title}\nVIDEO`
        ));

        const options = Array.from({ length: 15 }, (_, index) => `${prefix}xnxxdn${response.data.result[index].url} VIDEO`);
        console.log(options);

        const getIndex = await vorterx.sendMessage(coax.from, { type: 'poll', poll: { name: pollOptions, values: options, selectableCount: 1 } });
        
        console.log(pollOptions);
        
        if (getIndex !== undefined && getIndex !== null && getIndex >= 0 && getIndex < 15) {
          const videoUrl = response.data.result[getIndex].url;
          const xndn = `${prefix}xnxxdn${videoUrl} VIDEO`;
          console.log("Download command:", xndn);
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
      
