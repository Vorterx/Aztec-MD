/*
* @Author: DiegosonTech
* @BotName: Aztec-MD
*/

const fetch = async (url) => (await import('node-fetch')).default(url);

module.exports = {
  name: 'true',
  category: 'Mics',
  async client(vorterx, m, { args, connect, quoted }) {
   
    try {
      if (!m.quoted) {
        await vorterx.sendMessage(m.from, 'Please you Gay: Reply to a message containing a phone number...');
        return;
      }

      const userNum= args[0];
      const get_Num = `https://matrix-nextjs-api.vercel.app/api/truecaller?phone=${encodeURIComponent(userPhoneNumber)}&id=a1i0Q--j6pQD-V1-BJnOIongGhfL3HZuNr-yb1WJChcUdQn7GEc9yAScT71cs8_F`;

      const res = await fetch(get_Num);
      const mobile = await res.json();
      let info = `**Phone Detail**\n`;

      if (mobile.countryDetails) {
        const { name, native, phone, continent, capital, currency } = mobile.countryDetails;

        info += `**Country Details**\n`;
        info += `• **Name:** ${name}\n`;
        info += `• **Native:** ${native}\n`;
        info += `• **Phone Code:** +${phone[0]}\n`;
        info += `• **Continent:** ${continent}\n`;
        info += `• **Capital:** ${capital}\n`;
        info += `• **Currency:** ${currency.join(', ')}\n`;
      }

      await vorterx.sendMessage(m.from, { text: info }, { quoted: m });
    } catch (error) {
      console.error(error);
    }
  }
};
      
