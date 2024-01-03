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
  }, async (vorterx, coax, react, { args }) => {
  
    if (!args) {
      await react("❌");
      return coax.reply(`*Provide me a query, e.g., "Who made Aztec?"`);
    }

    const encodedArgs = encodeURIComponent(args);
    const gpt_api = `https://api.fgmods.xyz/api/info/openai?prompt=Tu%20nombre%20es%20DyLux&text=${encodedArgs}&apikey=qqdvVVub`;

    const res = await fetch(gpt_api);
    const result = await res.json();

    console.log(result);

    if (result.status === 200) {
      await react("💡");

      await vorterx.sendMessage(coax.from, {
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
      await react("❌");
      coax.reply(`${result.result}`);
    }
  });
    
