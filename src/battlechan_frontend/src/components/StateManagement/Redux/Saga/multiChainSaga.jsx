import { takeLatest, call, put, select } from "redux-saga/effects";
import { multiChainHandlerFailure,  multiChainHandlerRequest, multiChainHandlerSuccess } from "../Reducers/getMultiChainList";

const selectActor = (currState) => currState.actors.actor;


function* fetchMultiChainInHandler() {
  try {

    const actor = yield select(selectActor);
    // console.log('actor => => => ', actor)

    const chains = yield call([actor, actor.get_multichain_list]);

    // console.log('chains in multiChainSaga => ', chains)

    yield put(multiChainHandlerSuccess(chains));
  } catch (error) {
    yield put(multiChainHandlerFailure(error.toString()));
  }
}

export function* chainsSaga() {
  yield takeLatest(multiChainHandlerRequest.type, fetchMultiChainInHandler);
}
