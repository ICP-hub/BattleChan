import { takeLatest, call, put, select } from "redux-saga/effects";
import { latestLiveHandlerFailure, latestLiveHandlerRequest, latestLiveHandlerSuccess } from "../Reducers/latestLive";
const selectActor = (currState) => currState.actors.actor;
 
function* fetchlatestLiveHandler() {
  try {
    const actor = yield select(selectActor);
    // console.log("actor run => => => ",actor)

    const latestLive = yield call([actor, actor.get_latest_live_proposal]);

    // console.log('latestLive data  =>', latestLive)
    
    yield put(latestLiveHandlerSuccess(latestLive));
  } catch (error) {
    yield put(latestLiveHandlerFailure(error.toString()));
  }
}

export function* latestLiveProjectSaga() {
  yield takeLatest(latestLiveHandlerRequest().type, fetchlatestLiveHandler);
}
