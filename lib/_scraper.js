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

module.exports = { toAudio, toVideo };              
