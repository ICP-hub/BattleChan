import { call, put, takeLatest } from "redux-saga/effects";
import { AuthClient } from "@dfinity/auth-client";
import {
  loginStart,
  // loginFailure,
  loginSuccess,
  logoutFailure,
  logoutStart,
  logoutSuccess,
  checkLoginOnStart,
} from "../Reducers/InternetIdentityReducer";

function* clientInfo(authClient) {
    const identity = yield call([authClient, authClient.getIdentity]);

  const principal = identity.getPrincipal().toText();


  yield put(
    loginSuccess({
      isAuthenticated: true,
      identity,
      principal,
      navi: "roleSelect",
    })
  );
}

function* performLogin(authClient) {
  yield new Promise((resolve, reject) => {
    authClient.login({
      identityProvider:
        process.env.DFX_NETWORK === "ic"
          ? "https://identity.ic0.app"
          : `http://rdmx6-jaaaa-aaaaa-aaadq-cai.localhost:4943`,
      maxTimeToLive: BigInt(7 * 24 * 60 * 60 * 1000 * 1000 * 1000),
      onSuccess: () => resolve(),
      onError: (error) => reject(error),
    });
  });
}

function* checkLogin() {

  const authClient = yield AuthClient.create();
  const isAuthenticated = yield call([authClient, authClient.isAuthenticated]);

  if (isAuthenticated) {
    yield call(clientInfo, authClient);
  }

 
}

function* handleLogin() {

  const authClient = yield AuthClient.create();
  const isAuthenticated = yield call([authClient, authClient.isAuthenticated]);

  if (isAuthenticated) {
    yield call(clientInfo, authClient);
  } else {
    yield call(performLogin, authClient);
    yield call(clientInfo, authClient);
  }

 
}

function* handleLogout() {
  try {
    const authClient = yield AuthClient.create();
    yield call([authClient, authClient.logout]);
    yield put(logoutSuccess());
  } catch (error) {
    yield put(logoutFailure(error.toString()));
  }
}

export function* internetIdentitySaga() {
  yield takeLatest(checkLoginOnStart().type, checkLogin);
  yield takeLatest(loginStart().type, handleLogin);
  yield takeLatest(logoutStart().type, handleLogout);
}
