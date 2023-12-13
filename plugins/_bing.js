module.exports = {
    name: 'bing',
    category: 'GPT AI',
    async client(vorterx, m, { text, args, connect }) {

        async function Bing(prompt) {
            let response = await (await fetch("https://copilot.github1s.tk/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Authorization": "dummy",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
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
                })
            })).json();
            return response.choices[0].message.content;
        }

        if (text.startsWith('bing')) {
            
            const query = text.slice('bing'.length).trim();

    
            const bingResponse = await Bing(query);

            m.reply(bingResponse);
        }
    }
};
    
