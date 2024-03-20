import { takeLatest, call, put, select } from "redux-saga/effects";
import { latestListedHandlerFailure, latestListedHandlerRequest, latestListedHandlerSuccess } from "../Reducers/latestListed";

const selectActor = (currState) => currState.actors.actor;
 
function* fetchlatestListedHandler() {
  try {
    const actor = yield select(selectActor);
    // console.log("actor run => => => ",actor)

    const latestListed = yield call([actor, actor.get_latest_listed_project]);

    // console.log('latestListed data  =>', latestListed)
    
    yield put(latestListedHandlerSuccess(latestListed));
  } catch (error) {
    yield put(latestListedHandlerFailure(error.toString()));
  }
}

export function* latestListedProjectSaga() {
  yield takeLatest(latestListedHandlerRequest().type, fetchlatestListedHandler);
}
