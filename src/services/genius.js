import request from 'superagent';
import config from '../config/index.js';

export const getSongs = async (token) => {
  const res = await request
    .get(`${config.genius.url}/artists/16775/songs?access_token=${token}`);
  return res.body.response.songs;
};

export const getSongInfo = async (songId, token) => {
  const res = await request
    .get(`${config.genius.url}/songs/${songId}?access_token=${token}`);
  const song = res.body.response.song;
  if (!song.album) song.album = { name: '-' };
  return song;
};
