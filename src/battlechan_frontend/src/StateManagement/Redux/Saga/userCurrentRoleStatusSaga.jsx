import { takeLatest, call, put, select } from "redux-saga/effects";
import {
    getCurrentRoleStatusRequestHandler,
    getCurrentRoleStatusFailureHandler,
    setCurrentRoleStatus,
    setCurrentActiveRole,
    switchRoleRequestHandler,
    switchRoleRequestFailureHandler
} from '../Reducers/userCurrentRoleStatusReducer'


const selectActor = (currState) => currState.actors.actor;

// check if any role have status current ?? 
function getNameOfCurrentStatus(rolesStatusArray) {
    const currentStatus = rolesStatusArray.find(role => role.status === 'active');
    return currentStatus ? currentStatus.name : null;
}


function* fetchCurrentRoleStatus() {
    const actor = yield select(selectActor);

    if (actor) {
        const currentRoleArray = yield call([actor, actor.get_role_status]);
        if (currentRoleArray && currentRoleArray.length !== 0) {
            const currentActiveRole = yield call(getNameOfCurrentStatus, currentRoleArray)
            yield put(setCurrentRoleStatus(currentRoleArray));
            yield put(setCurrentActiveRole(currentActiveRole));
        } else {
            yield put(getCurrentRoleStatusFailureHandler(error.toString()));
            yield put(setCurrentActiveRole(null));
        }
    }
    // try {
    //     const actor = yield select(selectActor);
    //     const currentRoleArray = yield call([actor, actor.get_role_status]);
    //     const currentActiveRole = yield call(getNameOfCurrentStatus, currentRoleArray)
    //     yield put(setCurrentRoleStatus(currentRoleArray));
    //     yield put(setCurrentActiveRole(currentActiveRole));
    // } catch (error) {
    //     yield put(getCurrentRoleStatusFailureHandler(error.toString()));
    //     yield put(setCurrentActiveRole(null));
    // }
}

function* switchRoleRequestHandlerFunc(action) {
    const { roleName, newStatus } = action.payload;
    try {
        const actor = yield select(selectActor);
        yield call([actor, actor.switch_role], roleName, newStatus);
        // yield call(fetchCurrentRoleStatus());
    } catch (error) {
        yield put(switchRoleRequestFailureHandler(error.toString()));
    }
}

export function* userCurrentRoleSaga() {
    yield takeLatest(getCurrentRoleStatusRequestHandler().type, fetchCurrentRoleStatus);
    yield takeLatest(switchRoleRequestHandler().type, switchRoleRequestHandlerFunc);
}
