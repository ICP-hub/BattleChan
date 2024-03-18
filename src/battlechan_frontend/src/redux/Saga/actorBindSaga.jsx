import { takeLatest, call, put, select } from "redux-saga/effects";
import { setActor, handleActorRequest, actorError } from '../Reducers/actorBindReducer';
import { createActor } from "../../../../../declarations/project_backend/index";   // import kr lena from ur backend

const selectedIdentity = (state) => state.internet.identity;

function* initActorSaga() {
  try {
    const identity = yield select(selectedIdentity);
    // console.log('Identity in initActorSaga:', identity);
    
    const canisterId = process.env.CANISTER_ID_PROJECT_BACKEND || process.env.PROJECT_BACKEND_CANISTER_ID;  // this u will get from ur backend

    const actor = yield call(createActor, canisterId, { agentOptions: { identity } });
    
    // console.log('Actor initialized in initActorSaga:', actor);

    yield put(setActor(actor));
  } catch (error) {
    console.error('Error in initActorSaga:', error);
    yield put(actorError(error.toString()));
  }
}


export function* actorSaga() {
  yield takeLatest(handleActorRequest().type, initActorSaga);
}
