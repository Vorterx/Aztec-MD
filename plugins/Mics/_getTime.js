/*
* @Author: DiegosonTech
* @BotName: Aztec-MD 
*/

module.exports = {
  name: "runtime",
  category: "Mics",
  async client(vorterx, m, { text, args, connect }) {

  await connect('🕦');
    const startDate = new Date(); 
    const currentDate = new Date();
    const runtimeInMilliseconds = currentDate - startDate;

    let years = Math.floor(runtimeInMilliseconds / (365 * 24 * 60 * 60 * 1000));
    const remainingMilliseconds = runtimeInMilliseconds % (365 * 24 * 60 * 60 * 1000);
    let months = Math.floor(remainingMilliseconds / (30 * 24 * 60 * 60 * 1000));
    let seasons = Math.floor(months / 3);

    const seconds = Math.floor(runtimeInMilliseconds / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);

    const runtime = `${hours} hours, ${minutes % 60} minutes, ${seconds % 60} seconds`;

    const cap = `
╭–– 『 *GET TIME* 』      
┆ *⏳Runtime:* ${runtime}
┆ 
┆ *🏺Years:* ${years}
┆ 
┆ *⌚Months:* ${months}
┆  
┆ *📇Seasons:* ${seasons}
┆ 
┆ *⏱️Time:* ${new Date().toLocaleTimeString()}
╰–––––––––––––––༓\n\n*${config.CAPTION}*`;
    
    vorterx.sendMessage(m.from, { caption: tiny(cap) });
  }
};
