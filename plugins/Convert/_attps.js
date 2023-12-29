module.exports = {
  name: 'attp',
  category: 'Convert',
  async client(vorterx,m, { args, connect, quoted }) {

     if (!args) {
       await connect('❌');
      return m.reply('Please provide a text e.g attp Vorterx...');
     }
        await connect('✔️');
          vorterx.sendMessage(m.from, {
                    sticker: {
                        url: `https://api.lolhuman.xyz/api/attp?apikey=GataDios&text=${args}`}
                }, { quoted: m });

     }
  
}
