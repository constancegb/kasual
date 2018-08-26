import { combineReducers } from 'redux';

import { auth } from './auth';
import { sia } from './sia';

const musicApp = combineReducers({
  auth,
  sia
});


export default musicApp;
