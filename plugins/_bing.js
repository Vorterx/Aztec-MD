const axios = require('axios');

async function Bing(prompt) {
    try {
        const response = await axios.post("https://copilot.github1s.tk/v1/chat/completions", {
            "model": "Creative",
            "max_tokens": 100,
            "messages": [
                {
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
        
        if (!text) {
            await connect('❌');
            return m.reply('Please provide a text, e.g., bing hello');
        }
     await connect('✔️');
        const bingRes = await Bing(text);
      
    }
};
