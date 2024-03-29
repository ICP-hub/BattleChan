// reducers/index.js
import { combineReducers } from 'redux';
import nameReducer from './nameReducers';
import authReducer from './authReducer';

const rootReducer = combineReducers({
  name: nameReducer,
  auth: authReducer,
});

export default rootReducer;
