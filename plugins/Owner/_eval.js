const util = require('util');
const { Zenith } = require('../../lib/functions.js');

Zenith({
    usage: "eval",
    isOwner: true,
    category: "Owner",
    desc: "Runs server code"
}, async ({}) => {});

Zenith(
    {
        on: "args",
        isOwner: true,
    },
    async (
        vorterx, coax, react, { args }
    ) => {
        if (args.startsWith(">")) {
            try {
                        await react('🙂');
                            let evaled = await eval(`(async () => { ${args.replace(">", "")} })()`);
                                if (typeof evaled !== "string") evaled = util.inspect(evaled);
                                    await coax.reply(`${'```'}${evaled}${'```'}`);
                                     } catch (err) {
                                      await coax.reply(`_${util.format(err)}_`);   
                             }
                     }
         
          }

   );
                                
