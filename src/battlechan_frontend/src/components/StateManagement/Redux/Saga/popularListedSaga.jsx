import { takeLatest, call, put, select } from "redux-saga/effects";
import { popularListedHandlerFailure, popularListedHandlerRequest, popularListedHandlerSuccess } from "../Reducers/popularListed";
const selectActor = (currState) => currState.actors.actor;
 
function* fetchPopularListedHandler() {
  try {
    const actor = yield select(selectActor);
    // console.log("actor run => => => ",actor)

    const popularListed = yield call([actor, actor.get_popular_listed_project]);

    // console.log('popularListed data  =>', popularListed)
    
    yield put(popularListedHandlerSuccess(popularListed));
  } catch (error) {
    yield put(popularListedHandlerFailure(error.toString()));
  }
}

export function* popularListedProjectSaga() {
  yield takeLatest(popularListedHandlerRequest().type, fetchPopularListedHandler);
}
