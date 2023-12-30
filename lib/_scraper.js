/*
* @Author: DiegosonTech
* @BotName: Aztec-MD
*/

const ffmpeg = require('fluent-ffmpeg');
const coax = require('./client');

async function toAudio(buffer, ext) {
    try {
         await ffmpeg()
            .input(buffer)
            .inputFormat(ext)
            .audioCodec('libmp3lame')
            .audioChannels(2)
            .audioBitrate('128k')
            .audioFrequency(44100)
            .format('mp3')
            .saveToFile('output.mp3');

        coax.reply('');
    } catch (error) {
        coax.reply(`${error}`);
    }
}

async function toVideo(buffer, ext) {
    try {
       await ffmpeg()
            .input(buffer)
            .inputFormat(ext)
            .videoCodec('libx264')
            .audioCodec('aac')
            .format('mp4')
            .saveToFile('output.mp4');

        coax.reply('');
    } catch (error) {
        coax.reply(`${error}`);
    }
}

function toJson(data) {
    coax.reply(JSON.stringify(data));
}

function toCSV(data) {
      coax.reply(data.map(obj => Object.values(obj).join(',')).join('\n'));
}

function toXML(data) {
    coax.reply(`<root>${Object.entries(data).map(([key, value]) => `<${key}>${value}</${key}>`).join('')}</root>`);
}

function toLowerCase(inputString) {
    coax.reply(inputString.toLowerCase());
}

function toUpperCase(inputString) {
    coax.reply(inputString.toUpperCase());
}

function toBase64(data) {
    if (typeof data === 'string') {
        coax.reply(Buffer.from(data).toString('base64'));
    } else if (data instanceof Buffer) {
        coax.reply(data.toString('base64'));
    } else {
        coax.reply('Unsupported data type for Base64 conversion.');
    }
}

function toDate(timestampOrString) {
    coax.reply(new Date(timestampOrString));
}

function toHex(data) {
    if (typeof data === 'string') {
        coax.reply(Buffer.from(data).toString('hex'));
    } else if (data instanceof Buffer) {
        coax.reply(data.toString('hex'));
    } else {
        coax.reply('Unsupported data type for hexadecimal conversion.');
    }
}

function toArray(input) {
    if (typeof input === 'object') {
        coax.reply(Object.entries(input));
    } else if (typeof input === 'string') {
        coax.reply(input.split(''));
    } else {
        coax.reply('Unsupported data type for array conversion');
    }
}

function toQueryString(params) {
    coax.reply(Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        .join('&'));
}

function toBoolean(value) {
    coax.reply(Boolean(value));
}

function toFloat(value) {
    coax.reply(parseFloat(value));
}

function toInt(value) {
    coax.reply(parseInt(value, 10));
}

function toRadians(degrees) {
    coax.reply(degrees * (Math.PI / 180));
}

function toDegrees(radians) {
    coax.reply(radians * (180 / Math.PI));
}

function toCamelCase(inputString) {
    coax.reply(inputString.replace(/[-_](\w)/g, (_, c) => c.toUpperCase()));
}

function toSnakeCase(inputString) {
    coax.reply(inputString.replace(/[A-Z]/g, match => `_${match.toLowerCase()}`));
}

function toKebabCase(inputString) {
    coax.reply(inputString.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`));
}

function toReverse(input) {
    if (Array.isArray(input)) {
        coax.reply(input.reverse());
    } else if (typeof input === 'string') {
        coax.reply(input.split('').reverse().join(''));
    } else {
        coax.reply('Unsupported data type for reverse conversion');
    }
}

module.exports = {
    toAudio,
    toVideo,
    toJson,
    toCSV,
    toXML,
    toLowerCase,
    toUpperCase,
    toBase64,
    toDate,
    toHex,
    toArray,
    toQueryString,
    toBoolean,
    toFloat,
    toInt,
    toRadians,
    toDegrees,
    toCamelCase,
    toSnakeCase,
    toKebabCase,
    toReverse
};
