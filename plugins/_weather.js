const axios = require('axios');

module.exports = {
  name: 'weather',
  category: 'Search',
  description: 'To get weather information',
  async client(vorterx,m,{text,args,connect,mime}) {

  if (!text) {
          await connect('❌');
          return m.reply('*Please provide the city of the country e.g weather Johannesburg*');
        }

        try {
          await connect('🌈');
          const apiKey = 'e409825a497a0c894d2dd975542234b0';
          const weatherData = await getWeatherData(text, apiKey);

          const weatherReport = formatWeatherReport(weatherData);

          const gifUrl = "https://i.ibb.co/tD6DL2h/Cloud-burst.gif";

          await vorterx.sendMessage(m.from, { body: weatherReport, url: gifUrl, caption: weatherReport, gifPlayback: true }, m);
        } catch (error) {
          console.error(error);
          m.reply("Failed to fetch weather information. Please try again later.");
        }
      }
    }
async function getWeatherData(location, apiKey) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}&language=tr`;
  const response = await axios.get(url);
  return response.data;
}

function formatWeatherReport(weatherData) {
  const {
    name,
    sys: { country },
    weather,
    main: { temp, temp_min, temp_max, humidity },
    wind: { speed }
  } = weatherData;

  const weatherDescription = weather[0].description;

  const weatherReport = `🌤 *Weather Report* 🌤\n\n🔎 *Search Location:* ${name}\n*💮 Country:* ${country}\n🌈 *Weather:* ${weatherDescription}\n🌡️ *Temperature:* ${temp}°C\n❄️ *Minimum Temperature:* ${temp_min}°C\n📛 *Maximum Temperature:* ${temp_max}°C\n💦 *Humidity:* ${humidity}%\n🎐 *Wind:* ${speed} km/h\n`;

  return weatherReport;
}
