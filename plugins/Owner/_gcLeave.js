module.exports = {
  name: "leave",
  description: "Leave the group you are currently in",
  category: "Group",
  async client(vorterx, m, { isAdmin, isGroup, connect, isBotAdmin }) {
   
    if (!m.isGroup) {
      const reactAztec = ["❌", "🚫", "🙅‍♀️", "🤷‍♂️"];
      const vorterx_react = reactAztec[Math.floor(Math.random() * reactAztec.length)];
      await connect(vorterx_react);
      return m.reply("*🤔 Where are you heading? This command is for owner only.*");
     }

    const reactAztec = ["👋", "👋🏼", "🤚", "✌️", "👋🏽"];
    const vorterx_react = reactAztec[Math.floor(Math.random() * reactAztec.length)];
    await connect(vorterx_react);

     const Diegoson = [
      "👋 Farewell, mates! Until we meet again! 👋",
      "🚶‍♂️ Leaving the group now. Take care, everyone! 🚶‍♂️",
      "👋 It's time for me to say goodbye. Stay awesome! 👋",
      "🌟 Departing from the group. See you on the flip side! 🌟",
      "👋 Leaving the group. Thanks for the memories! 👋",
     ];

     const vorterx_cap = Diegoson[Math.floor(Math.random() * Diegoson.length)];
     const caption = `*${vorterx_cap}*`;

     await m.reply(caption);
    await vorterx.groupLeave(m.from, {quoted:m});
   },
  };
