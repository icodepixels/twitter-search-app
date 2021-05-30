import { combineReducers } from 'redux';

import params from './params';
import tweets from './tweets';

const rootReducer = combineReducers({
	params,
	tweets
});

export default rootReducer;