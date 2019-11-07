import { combineReducers } from 'redux';

//reducers
import appReducer          from './appReducer';
import profileReducer      from './profileReducer';
import notificationReducer from './notificationReducer';
import postReducer         from './postReducer';
import followReducer       from './followReducer';
import userReducer         from './userReducer';

export default combineReducers({
	app:           appReducer,
	profile:       profileReducer,
	notifications: notificationReducer,
	posts:         postReducer,
	follow:        followReducer,
	user:          userReducer
});