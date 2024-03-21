import { takeLatest, call, put, select } from "redux-saga/effects";
import { popularLiveHandlerFailure, popularLiveHandlerRequest, popularLiveHandlerSuccess } from "../Reducers/popularLive";
const selectActor = (currState) => currState.actors.actor;
 
function* fetchPopularLiveHandler() {
  try {
    const actor = yield select(selectActor);
    // console.log("actor run => => => ",actor)

    const popularLive = yield call([actor, actor.get_popular_live_proposal]);

    // console.log('popularLive data  =>', popularLive)
    
    yield put(popularLiveHandlerSuccess(popularLive));
  } catch (error) {
    yield put(popularLiveHandlerFailure(error.toString()));
  }
}

export function* popularLiveProjectSaga() {
  yield takeLatest(popularLiveHandlerRequest().type, fetchPopularLiveHandler);
}
