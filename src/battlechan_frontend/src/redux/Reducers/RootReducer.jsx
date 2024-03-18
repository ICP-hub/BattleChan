import { combineReducers } from '@reduxjs/toolkit';
import RoleReducer from './RoleReducer';
import actorReducer from './actorBindReducer';
import internetIdentityReducer from './InternetIdentityReducer';

const rootReducer = combineReducers({
  role: RoleReducer,
  actors:actorReducer,
  internet: internetIdentityReducer,
});

export default rootReducer;
