import { createStore, applyMiddleware } from 'redux';
import musicApp from './reducers';
import thunk from 'redux-thunk';

export const store = createStore(
	musicApp,
	applyMiddleware(thunk)
);
