import { SET_SONGS } from '../actions/sia';

export const sia = (state = {}, action) => {
  switch(action.type) {
    case SET_SONGS:
      return {
        ...state,
        songs: action.songs
      };
    default:
      return state;
  }
};
