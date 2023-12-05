const axios = require("axios");
const cheerio = require("cheerio");
const { resolve } = require("path");
let BodyForm = require("form-data");
let { fromBuffer } = require("file-type");
const { sizeFormatter } = require('human-readable')
const child_process = require("child_process");
const jimp = require('jimp');
const ffmpeg = require("fluent-ffmpeg");
const { unlink } = require("fs").promises;



exports.getRandom = (Numb) => {
return `${Math.floor(Math.random() * 10000)}${Numb}`
}
exports.isNumber = (number) => {
  const int = parseInt(number);
  return typeof int === "number" && !isNaN(int);
};
exports.fetchUrl = async (url, options) => {
  try {
    options ? options : {};
    const res = await axios({
      method: "GET",
      url: url,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36",
      },
      ...options,
    });
    return res.data;
  } catch (err) {
    return err;
  }
};
exports.WAVersion = async () => {
  let get = await exports.fetchUrl(
    "https://web.whatsapp.com/check-update?version=1&platform=web"
  );
  let version = [get.currentVersion.replace(/[.]/g, ", ")];
  return version;
};
exports.isUrl = (url) => {
  return url.match(
    new RegExp(
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
      "gi"
    )
  );
};

exports.generateProfilePicture = async (buffer) => {
	const jimp = await jimp_1.read(buffer)
	const min = jimp.getWidth()
	const max = jimp.getHeight()
	const cropped = jimp.crop(0, 0, min, max)
	return {
        img: await cropped.scaleToFit(720, 720).getBufferAsync(jimp_1.MIME_JPEG),
	preview: await cropped.scaleToFit(720, 720).getBufferAsync(jimp_1.MIME_JPEG)
	}
}
const runtime = function(seconds) {
	seconds = Number(seconds);
	var d = Math.floor(seconds / (3600 * 24));
	var h = Math.floor(seconds % (3600 * 24) / 3600);
	var m = Math.floor(seconds % 3600 / 60);
	var s = Math.floor(seconds % 60);
	var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
	var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
	var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
	var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
	return dDisplay + hDisplay + mDisplay + sDisplay;
}
exports.formatp = sizeFormatter({
    std: 'JEDEC',
    decimalPlaces: 2,
    keepTrailingZeroes: false,
    render: (literal, symbol) => `${literal} ${symbol}B`,
})
function format(...args) {
	return util.format(...args)
}
exports.TelegraPh = (Path) => {
  return new Promise(async (resolve, reject) => {
    if (!fs.existsSync(Path)) return reject(new Error("File not Found"));
    try {
      const form = new BodyForm();
      form.append("file", fs.createReadStream(Path));
      const data = await axios({
        url: "https://telegra.ph/upload",
        method: "POST",
        headers: {
          ...form.getHeaders(),
        },
        data: form,
      });
      return resolve("https://telegra.ph" + data.data[0].src);
    } catch (err) {
      return reject(new Error(String(err)));
    }
  });
};
exports.buffergif = async (image) => {
  const filename = `${Math.random().toString(36)}`;
  await fs.writeFileSync(`./dustbin/${filename}.gif`, image);
  child_process.exec(
    `ffmpeg -i ./dustbin/${filename}.gif -movflags faststart -pix_fmt yuv420p -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" ./dustbin/${filename}.mp4`
  );
  await sleepy(4000);

  var buffer5 = await fs.readFileSync(`./dustbin/${filename}.mp4`);
  Promise.all([
    unlink(`./dustbin/${filename}.mp4`),
    unlink(`./dustbin/${filename}.gif`),
  ]);
  return buffer5;
};
async function getJson(url, options) {
    try {
      options ? options : {};
      const res = await axios({
        method: "GET",
        url: url,
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36",
        },
        ...options,
      });
      return res.data;
    } catch (err) {
      return err;
    }
  }
exports.getBuffer = async (url) => {
try {
const response = await axios.get(url, {
responseType: 'arraybuffer'
})
return response
} catch (error) {
 console.log(error);
 }     
 }
// Function to extract numbers
const extractNumbers = (content) => {
  const numbers = content.match(/(-?\d+)/g);
  return numbers ? numbers.map((n) => Math.max(parseInt(n), 0)) : [];
};

// Function to extract URLs
const extractUrls = (content) => {
  const urls = content.match(/(\bhttps?:\/\/\S+)/gi);
  return urls || [];
};

module.exports = {
  runtime,
  extractNumbers,
  extractUrls,
};
