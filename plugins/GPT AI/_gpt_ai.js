/*
* @Author: DiegosonTech
* @BotName: Aztec-MD
*/

const fetch = async (url) => import('node-fetch').then(module => module.default(url));
const { getBuffer } = require('../../lib/_getBuffer.js');
const { Zenith } = require('../../lib/_cmd_sxntax.js');

Zenith(
  {
    usage: "gpt",
    alias: ["ai", "openai", "chatgpt"],
    category: "GPT AI",
    desc: "Randomly search",
    filename: __filename
  }, async (vorterx, m, react, { args }) => {
  
    if (!args) {
      await react("❌");
      return m.reply(`*Provide me a query, e.g., "Who made Aztec?"`);
    }

    const encodedArgs = encodeURIComponent(args);
    const gpt_api = `https://api.lolhuman.xyz/api/openai-turbo?apikey=GataDios&text=${encodedArgs}`;                                                                                    
    const res = await fetch(gpt_api);
    const result = await res.json();
    console.log(result);

    if (result.status === true) {
      await react("💡");
      await vorterx.sendMessage(m.chat, {
        text: result.result,
        image: { url: "https://i.ibb.co/9bfjPyH/1-t-Y7-MK1-O-S4eq-YJ0-Ub4irg.png" },
        contextInfo: {
          externalAdReply: {
            title: "GPT TURBO 3.5K",
            body: "",
            mediaType: 1,
            thumbnail: await getBuffer("https://i.ibb.co/9bfjPyH/1-t-Y7-MK1-O-S4eq-YJ0-Ub4irg.png"),
            mediaUrl: "",
            sourceUrl: "",            
          },
        },
      });
    } else {

    }
  });
  
