const ffmpeg = require('fluent-ffmpeg');

function toAudio(buffer, ext) {
    return new Promise((resolve, reject) => {
        ffmpeg()
            .input(buffer)
            .inputFormat(ext)
            .audioCodec('libmp3lame')
            .audioChannels(2)
            .audioBitrate('128k')
            .audioFrequency(44100)
            .format('mp3')
            .on('end', () => resolve(''))
            .on('error', (err) => reject(`${err}`))
            .saveToFile('output.mp3');
    });
}

function toVideo(buffer, ext) {
    return new Promise((resolve, reject) => {
        ffmpeg()
            .input(buffer)
            .inputFormat(ext)
            .videoCodec('libx264')
            .audioCodec('aac')
            .format('mp4')
            .on('end', () => resolve(''))
            .on('error', (err) => reject(`${err}`))
            .saveToFile('output.mp4');
    });
}

function toJson(data) {
    return JSON.stringify(data);
}

function toCSV(data) {
    return data.map(obj => Object.values(obj).join(',')).join('\n');
}

function toXML(data) {
    return `<root>${Object.entries(data).map(([key, value]) => `<${key}>${value}</${key}>`).join('')}</root>`;
}

function toLowerCase(inputString) {
    return inputString.toLowerCase();
}

function toUpperCase(inputString) {
    return inputString.toUpperCase();
}

module.exports = { toAudio, toVideo, toJson, toCSV, toXML, toLowerCase, toUpperCase };
                                         
