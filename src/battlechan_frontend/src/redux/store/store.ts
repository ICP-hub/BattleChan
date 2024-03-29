// src/redux/store.ts

import { createStore, combineReducers } from 'redux';
import { authReducer } from '../reducers/authReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  // Add other reducers here
});

export const store = createStore(rootReducer);
