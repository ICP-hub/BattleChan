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

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["role", "hubs", "current"],
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
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "actors/setActor",
          "internet/loginSuccess",
          "internet/loginFailure",
        ],
        ignoredPaths: ["actors.actor", "internet.identity"],

        // // Ignore these field paths in all actions
        ignoredActionPaths: ["payload.identity", "payload.actor"],
        // // Ignore these paths in the state
      },
    }).concat(sagaMiddleware),
  // yae ek bouncer ki trah hai action k lie but , allow krega defaultMiddleWare(eg: dj) ko or dj friend ko i.e sagaMiddleware (dj friend)
});

sagaMiddleware.run(rootSaga); //  sagaMiddleware check krega actions ko before they reach the reducers.

export const persistor = persistStore(store);
export default store;
