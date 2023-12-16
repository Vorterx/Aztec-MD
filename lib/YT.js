const YT = require('./YTModule.js');
const url = 'your_youtube_url_here';
const type = 'video';
const id = YT.parseId(url);

YT.validateURL(url)
    .then(valid => {
        if (valid) {
            return YT.getYTInfo(url);
        } else {
            throw new Error('Invalid YouTube URL');
        }
    })
    .then(info => console.log(info))
    .catch(error => console.error(error));

YT.getBuffer(url, type)
    .then(buffer => console.log(buffer))
    .catch(error => console.error(error));

YT.getThumbnail(id)
    .then(thumbnail => console.log(thumbnail))
    .catch(error => console.error(error));
