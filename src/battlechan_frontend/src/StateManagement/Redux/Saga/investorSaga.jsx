import { takeLatest, call, put, select } from "redux-saga/effects";
import {
  investorRegisteredHandlerFailure,
  investorRegisteredHandlerRequest,
  investorRegisteredHandlerSuccess,
} from "../Reducers/investorRegisteredData";

const selectActor = (currState) => currState.actors.actor;

function* fetchInvestorHandler() {
  try {
    const actor = yield select(selectActor);
    console.log("actor in investor => => => ", actor);

    const investorData = yield call([actor, actor.get_venture_capitalist_info]);

    console.log("investorData in investorsaga  => ", investorData);

    yield put(investorRegisteredHandlerSuccess(investorData));
  } catch (error) {
    yield put(investorRegisteredHandlerFailure(error.toString()));
  }
}

export function* fetchInvestorSaga() {
  yield takeLatest(investorRegisteredHandlerRequest.type, fetchInvestorHandler);
}
