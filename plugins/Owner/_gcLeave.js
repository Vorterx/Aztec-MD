const { Zenith } = require ('../../lib/_cmd_sxntax.js');

Zenith(
  {
   usage: "leave",
   desc: "Leave the group you are currently in",
   category: "Group",
   filename: __filename
}, async (vorterx, coax,react, {isDev, isGroup}) => {
    
    if (!isDev) {
      await react('❌');
      return coax.reply('This cmd is for my Dev only...');
    } else {
      if (!coax.isGroup) {
        const reactAztec = ["❌", "🚫", "🙅‍♀️", "🤷‍♂️"];
        const vorterx_react = reactAztec[Math.floor(Math.random() * reactAztec.length)];
        await react(vorterx_react);
        return coax.reply("*🤔 Where are you heading? This command is for group only.*");
      }

      const reactAztec = ["👋", "👋🏼", "🤚", "✌️", "👋🏽"];
      const vorterx_react = reactAztec[Math.floor(Math.random() * reactAztec.length)];
      await react(vorterx_react);

      const Diegoson = [
        "👋 Farewell, mates! Until we meet again! 👋",
        "🚶‍♂️ Leaving the group now. Take care, everyone! 🚶‍♂️",
        "👋 It's time for me to say goodbye. Stay awesome! 👋",
        "🌟 Departing from the group. See you on the flip side! 🌟",
        "👋 Leaving the group. Thanks for the memories! 👋",
      ];

      const vorterx_cap = Diegoson[Math.floor(Math.random() * Diegoson.length)];
      const caption = `*${vorterx_cap}*`;

      await coax.reply(caption);
      await vorterx.groupLeave(coax.from, { quoted: coax });
    }
  });
