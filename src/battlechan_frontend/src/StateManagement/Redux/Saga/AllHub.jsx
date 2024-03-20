import { takeLatest, call, put, select } from "redux-saga/effects";
import {
  allHubHandlerRequest,
  allHubHandlerSuccess,
  allHubHandlerFailure,
} from "../Reducers/All_IcpHubReducer";

const selectActor = (currState) => currState.actors.actor;
 
function* fetchAllHubsHandler() {
  try {
    const actor = yield select(selectActor);
    // console.log("actor run => => => ",actor)

    const Allhubs = yield call([actor, actor.get_icp_hubs_candid]);

    // console.log('allhubs data mc =>', Allhubs)
    yield put(allHubHandlerSuccess(Allhubs));
  } catch (error) {
    yield put(allHubHandlerFailure(error.toString()));
  }
}

export function* allHubsSaga() {
  yield takeLatest(allHubHandlerRequest().type, fetchAllHubsHandler);
}
