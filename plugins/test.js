module.exports = {
  name: 'test',
  category: 'Tesr',
  async client(vorterx, m, { text, args }) {
    const lowerText = text.toLowerCase();

    if (lowerText === 'menu' || lowerText === 'list' || lowerText === 'alive' || lowerText === 'ping' || lowerText === 'status') {
      const pollMessage = `
Poll Menu
1️⃣ List - List option description
2️⃣ Ping - Ping option description
3️⃣ Alive - Alive option description
4️⃣ Status - Status option description
`;

      vorterx.sendMessage(m.from, { poll: pollMessage });
    }
  },
};
  
