/*
* @Author: DiegosonTech
* @BotName: Aztec-MD
*/

   const { Zenith } = require('../../lib/functions.js');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

Zenith(
  {
    usage: 'shutdown',
    desc: 'To shut down the bot',
    category: 'Owner',
    filename: __filename
  },
  async (vorterx, m, react, { isDev }) => {
    
            if (!isDev) {
                await react('❌');
                   return m.reply('This command is for my Dev only');
              }

                  await react('🌀');
                      m.reply('_Shutting down_');
                        await sleep(3000);
                            process.exit();
             }
);
         
