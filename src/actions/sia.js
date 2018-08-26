export const SET_SONGS = 'SET_SONGS';

export function setSongs(songs) {
  return {
    type: SET_SONGS,
    songs
  };
}
