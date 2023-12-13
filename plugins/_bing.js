 const axios = require('axios');

async function Bing(prompt) {
    try {
        const response = await axios.post("https://copilot.github1s.tk/v1/chat/completions", {
            "model": "Creative",
            "max_tokens": 100,
            "messages": [{
                    "role": "system",
                    "content": "You are a helpful assistant."
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        }, {
            headers: {
                "Authorization": "dummy",
                "Content-Type": "application/json"
            }
        });

        return response.data.choices[0].message.content;
    } catch (error) {
        console.error("Error fetching data from Bing:", error);
        return "An error occurred while fetching data from Bing.";
    }
}

module.exports = {
    name: 'bing',
    category: 'GPT AI',
    async client(vorterx, m, { text, args, connect }) {
        const prompt = args.join(' ');

        if (prompt) {
            try {
                const bingRes = await Bing(prompt);
                m.reply(bingRes);
            } catch (error) {
                console.error("Error processing Bing request:", error);
                m.reply("An error occurred while processing the Bing request.");
            }
        } else {
            m.reply('Need a query, please provide one. e.g., `bing how are you`');
        }
    }
};
