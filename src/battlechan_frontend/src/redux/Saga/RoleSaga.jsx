
// sample how to use actor in saga to bind funtion 

import { takeLatest, call, put, select } from "redux-saga/effects";
import { rolesHandlerFailure,rolesHandlerRequest, rolesHandlerSuccess } from "../Reducers/RoleReducer";


const selectActor = (currState) => currState.actors.actor;    // this is how we have to use actor instead of using useSelector we have to use this 


function* fetchRoleHandler() {
  try {

    const actor = yield select(selectActor);  // then while using select it will provide u bind actor , which is stored in redux 
    // console.log('actor => => => ', actor)

    const roles = yield call([actor, actor.get_all_roles]);   // this is how we use actor to call backend functon in saga 

    // console.log('roles in rolesaga => ', roles)

    yield put(rolesHandlerSuccess(roles));    // yield behave as await and to send back data to reducer function we use 'put' 
  } catch (error) {
    yield put(rolesHandlerFailure(error.toString()));
  }
}

export function* roleSaga() {
  yield takeLatest(rolesHandlerRequest.type, fetchRoleHandler);
}
