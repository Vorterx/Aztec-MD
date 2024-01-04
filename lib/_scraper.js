/*
* @Author: DiegosonTech
* @BotName: Aztec-MD
*/

const ffmpeg = require('fluent-ffmpeg');
const m = require('./client');

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

        m.reply('');
    } catch (error) {
        m.reply(`${error}`);
    }
}

function toJson(data) {
    m.reply(JSON.stringify(data));
}

function toCSV(data) {
      m.reply(data.map(obj => Object.values(obj).join(',')).join('\n'));
}

function toXML(data) {
    m.reply(`<root>${Object.entries(data).map(([key, value]) => `<${key}>${value}</${key}>`).join('')}</root>`);
}

function toLowerCase(inputString) {
    m.reply(inputString.toLowerCase());
}

function toUpperCase(inputString) {
    m.reply(inputString.toUpperCase());
}

function toBase64(data) {
    if (typeof data === 'string') {
        m.reply(Buffer.from(data).toString('base64'));
    } else if (data instanceof Buffer) {
        m.reply(data.toString('base64'));
    } else {
        m.reply('Unsupported data type for Base64 conversion.');
    }
}

function toDate(timestampOrString) {
    m.reply(new Date(timestampOrString));
}

function toHex(data) {
    if (typeof data === 'string') {
        m.reply(Buffer.from(data).toString('hex'));
    } else if (data instanceof Buffer) {
        m.reply(data.toString('hex'));
    } else {
        m.reply('Unsupported data type for hexadecimal conversion.');
    }
}

function toArray(input) {
    if (typeof input === 'object') {
        m.reply(Object.entries(input));
    } else if (typeof input === 'string') {
        m.reply(input.split(''));
    } else {
        m.reply('Unsupported data type for array conversion');
    }
}

function toQueryString(params) {
    m.reply(Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        .join('&'));
}

function toBoolean(value) {
    m.reply(Boolean(value));
}

function toFloat(value) {
    m.reply(parseFloat(value));
}

function toInt(value) {
    m.reply(parseInt(value, 10));
}

function toRadians(degrees) {
    m.reply(degrees * (Math.PI / 180));
}

function toDegrees(radians) {
    m.reply(radians * (180 / Math.PI));
}

function toCamelCase(inputString) {
    m.reply(inputString.replace(/[-_](\w)/g, (_, c) => c.toUpperCase()));
}

function toSnakeCase(inputString) {
    m.reply(inputString.replace(/[A-Z]/g, match => `_${match.toLowerCase()}`));
}

function toKebabCase(inputString) {
    m.reply(inputString.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`));
}

function toReverse(input) {
    if (Array.isArray(input)) {
        m.reply(input.reverse());
    } else if (typeof input === 'string') {
        m.reply(input.split('').reverse().join(''));
    } else {
        m.reply('Unsupported data type for reverse conversion');
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
