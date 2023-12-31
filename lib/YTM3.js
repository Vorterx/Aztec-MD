const search = require('yt-search');

// ┌─────────────────────────────────────────┐
// │  @YTM3 class for music search                    
// │  @Author: DiegosonTech                          
// └─────────────────────────────────────────┘

class YTM3 {
  static searchMusic(query, callback) {
    if (!query || typeof query !== 'string') {
      const error = new Error('_...Invalid query. Please provide a valid name..._');
      callback(error, null);
      return;
    }

    search(query, (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        const videos = result.videos;
        const musicResults = videos.map(video => ({
          title: video.title,
          url: video.url,
          thumbnail: video.image,
          uploadDate: video.ago,
          views: video.views,
          duration: video.timestamp,
        }));
        callback(null, musicResults);
      }
    });
  }
}

module.exports = { YTM3 };      
