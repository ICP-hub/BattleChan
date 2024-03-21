import { takeLatest, call, put, select } from "redux-saga/effects";
import { areaOfExpertiseHandlerFailure,  areaOfExpertiseHandlerRequest, areaOfExpertiseHandlerSuccess } from "../Reducers/getAreaOfExpertise";

const selectActor = (currState) => currState.actors.actor;


function* fetchAreaExpertiseInHandler() {
  try {

    const actor = yield select(selectActor);
    // console.log('actor => => => ', actor)

    const expertiseIn = yield call([actor, actor.get_area_focus_expertise]);

    // console.log('expertiseIn in areaOfExpertiseSaga => ', expertiseIn)

    yield put(areaOfExpertiseHandlerSuccess(expertiseIn));
  } catch (error) {
    yield put(areaOfExpertiseHandlerFailure(error.toString()));
  }
}

export function* expertiseInSaga() {
  yield takeLatest(areaOfExpertiseHandlerRequest.type, fetchAreaExpertiseInHandler);
}
