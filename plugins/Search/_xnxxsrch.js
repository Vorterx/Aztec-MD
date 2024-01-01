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

    axios.get(xnxx_vid)
      .then(response => {
        console.log(response.data);

        if (response.data && response.data.result.length > 0) {
          const pollOptions = response.data.result.map((result, index) => (
            `Xnxx ${index + 1}\nTitle: ${result.title}\nLink: ${result.url}`
          ));

          
          vorterx.sendMessage(coax.from, {
            poll: {
              question: 'Which video do you want to download?',
              options: pollOptions,
              multiselect: false,
              selectableCount: 1,
              isAnonymous: false,
              closeAfterVoting: true,
              footer: 'React with your choice to download the corresponding video.'
            }
          });

          return;
        } else {
          return coax.reply(":x: No results found.");
        }
      })
      .catch(error => {
        console.error(error);
        return coax.reply(":warning: An error occurred while fetching the data.");
      });
  }
);
      
