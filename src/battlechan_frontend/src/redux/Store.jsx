import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./Reducers/RootReducer";
import rootSaga from "./Saga/RootSaga";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// import { encryptTransform } from 'redux-persist-transform-encrypt';

// Configure your encryption transform
// const encryptor = encryptTransform({
//   secretKey: 'bjhcvdygvhnwoicbvyuridbiushvyudhbciu',
//   onError: function(error) {
//     console.error('Encryption Error:', error);
//   },
// });


// above code use kia for encrypting persisting data , development time comment kia finally before live un-comment it 

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "role",]    // <=  jis data ko persist mai daalna hoga uske reduer function ka name hoga eg:- name='auth' isme hoga 
  // transforms: [encryptor], // encrypt k lie kia
};

// Wrap kie rootReducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  // devTools:false,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore krne k lie these action types in serializability check
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE","actors/setActor" ,'internet/loginSuccess', 'internet/loginFailure'],
        ignoredPaths: ['actors.actor','internet.identity'],
        
        // Ignore these field paths in all actions
         ignoredActionPaths: ['payload.identity','payload.actor'],
      },
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga); //  sagaMiddleware check krega actions ko before they reach the reducers.

export const persistor = persistStore(store);
export default store;
