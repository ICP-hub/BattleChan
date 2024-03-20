import { takeLatest, call, put, select } from "redux-saga/effects";
import {
  userRoleHandler,
  userRoleFailureHandler,
  userRoleSuccessHandler,
} from "../Reducers/userRoleReducer";

const selectActor = (currState) => currState.actors.actor;

function* fetchUserRoleHandler() {
  try {
    const actor = yield select(selectActor);

    // console.log("actor in fetchUserRoleHandler => => => ", actor);

    const userCurrentRole = yield call([actor, actor.get_role_from_p_id]);

    // console.log("userCurrentRole ,,,,,,,,", userCurrentRole);
    // console.log(
    //   "userCurrentRole => => => ",
    //   Object.keys(userCurrentRole[0][0])[0]
    // );

    yield put(userRoleSuccessHandler(Object.keys(userCurrentRole[0][0])[0]));
  } catch (error) {
    yield put(userRoleFailureHandler(error.toString()));
  }
}

export function* userRoleSaga() {
  yield takeLatest(userRoleHandler().type, fetchUserRoleHandler);
}
