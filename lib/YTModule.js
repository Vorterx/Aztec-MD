const request = require('./request');
const fs = require('fs-extra');
const { tmpdir } = require('os');
const ytdl = require('ytdl-core');

function parseId(url) {
    const split = url.split('/');
    if (url.includes('youtu.be')) return split[split.length - 1];
    return url.split('=')[1];
}

async function validateURL(url) {
    return ytdl.validateURL(url);
}

async function getInfo(url) {
    return await ytdl.getInfo(url);
}

async function getBuffer(url, type, filename = `${tmpdir()}/${Math.random().toString(36)}.${type === 'audio' ? 'mp3' : 'mp4'}`) {
    const stream = fs.createWriteStream(filename);
    ytdl(url, { quality: type === 'audio' ? 'highestaudio' : 'highest' }).pipe(stream);

    filename = await new Promise((resolve, reject) => {
        stream.on('finish', () => resolve(filename));
        stream.on('error', (err) => reject(err && console.log(err)));
    });

    return await fs.readFile(filename);
}

async function getThumbnail(url) {
    const id = parseId(url);
    return await request.buffer(`https://i.ytimg.com/vi/${id}/hqdefault.jpg`);
}

const YT = { parseId, validateURL, getInfo, getBuffer, getThumbnail };

module.exports = { YT };
