import {get} from './http.js'

export const Banner = params => get('/api/banner', params);

// export const MusicNav = params => get('/api/top/playlist/highquality', params);
export const MusicNav = params => get('/api/personalized/newsong?limit=21', params);

export const NewMusic = params => get('/api/personalized/newsong', params);

export const HotSearch = params => get('/api/search/hot/detail', params);

export const Comment = params => get('/api/comment/music', params);








