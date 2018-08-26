import { LOGOUT, LOGIN } from '../actions/auth';

export const auth = (state = { token: null }, action) => {
  switch(action.type) {
    case LOGOUT:
      return {};
    case LOGIN:
      return {
        ...state,
        token: action.token
      };
    default:
      return state;
  }
};
