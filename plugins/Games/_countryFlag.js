
const countries = {


Zenith({ usage: 'flag', 
         desc: 'Guess country flag', 
         category: 'GAMES 3D', 
      }, async (vorterx, m, react, { args }) => {
           
  const countryCodes = Object.keys(countries);
  const randomCountryCode = countryCodes[Math.floor(Math.random() * countryCodes.length)];

  const correctFlagAndName = countries[randomCountryCode];
  const [correctFlag, correctCountryName] = correctFlagAndName.split(' ');

  vorterx.sendMessage(m.chat, {
    text: `Guess the country flag for ${correctCountryName}:\n${correctFlag}`,
    options: [
      { label: 'A', value: 'Option A' },
      { label: 'B', value: 'Option B' },
      { label: 'C', value: 'Option C' },
      { label: 'D', value: 'Option D' },
      { label: 'E', value: 'Option E' },
      { label: 'F', value: 'Option F' },
      { label: 'G', value: 'Option G' },
      { label: 'H', value: 'Option H' },
      { label: 'I', value: 'Option I' },
      { label: 'J', value: 'Option J' },
      { label: 'K', value: 'Option K' },
      { label: 'L', value: 'Option L' },
      { label: 'M', value: 'Option M' },
      { label: 'N', value: 'Option N' },
      { label: 'O', value: 'Option O' },
      { label: 'P', value: 'Option P' },
      { label: 'Q', value: 'Option Q' },
      { label: 'R', value: 'Option R' },
      { label: 'S', value: 'Option S' },
      { label: 'T', value: 'Option T' },
      { label: 'U', value: 'Option U' },
      { label: 'V', value: 'Option V' },
      { label: 'W', value: 'Option W' },
      { label: 'X', value: 'Option X' },
      { label: 'Y', value: 'Option Y' },
      { label: 'Z', value: 'Option Z' },
    ],
    onOptions: async (selectedOption) => {
          
      if (selectedOption === 'Option A') {
        vorterx.sendMessage(m.chat, {
          text: `Congratulations, ${m.pushName}! You guessed the correct flag for ${correctCountryName}.`,
        });
      } else {
        vorterx.sendMessage(m.chat, {
          text: `Sorry, ${m.pushName}. That's not the correct flag for ${correctCountryName}.`,
        });
      }
    },
  });
});
    
