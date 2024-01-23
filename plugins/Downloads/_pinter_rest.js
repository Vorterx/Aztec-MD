//
const { Zenith } = require('../../lib/functions');
const config = require('../../config');

Zenith({
  usage: 'pinterest',
  desc: 'Download from Pinterest',
  alias: ['pint'],
  category: 'Downloads',
}, async (vorterx, m, react, { args }) => {
  if (!args || !args.includes("https://pin.it")) {
    console.error("BAKA!! Provide a valid pin link");
    return m.reply('BAKA!! Provide a valid pin link');
  }

  await react("🍁");

  const { data: responseData } = await axios.post(
    'https://offeo.com/download/wp-json/aio-dl/video-data/',
    { url: args },
    {
      headers: {
        'Accept': '*/*',
        'Accept-Encoding': 'gzip, deflate, br',
      },
    }
  );

  let responseMessage = `*✨ Post Details: ✨*\n- *URL:* ${responseData.url}\n- *Title:* ${responseData.title}\n- *Duration:* ${responseData.duration}\n- *Source:* ${responseData.source}\n\n`;

  responseData.medias.forEach(media => {
    responseMessage += `*✨ Media: ✨*\n- *Quality:* ${media.quality}\n- *Extension:* ${media.extension}\n- *Size:* ${media.size}\n- *Formatted Size:* ${media.formattedSize}\n- *Video Available:* ${media.videoAvailable}\n- *Audio Available:* ${media.audioAvailable}\n- *Cached:* ${media.cached}\n\n`;
  });

  const videoUrl = responseData.medias[0].url;

  await vorterx.sendMessage(m.chat, { video: { url: videoUrl }, caption: `🚀 Powered by ${botName}\n\n${responseMessage}` }, { quoted: m });
});
