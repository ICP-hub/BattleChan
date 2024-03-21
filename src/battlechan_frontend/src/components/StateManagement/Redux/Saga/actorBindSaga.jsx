// import { takeLatest, call, put, select } from "redux-saga/effects";
// import {
//   setActor,
//   handleActorRequest,
//   actorError,
// } from "../Reducers/actorBindReducer";
// import { createActor } from "../../../../../../declarations/backend/index";
// const selectedIdentity = (state) => state.internet.identity;

// function* initActorSaga() {
//   try {
//     const identity = yield select(selectedIdentity);
//     // console.log('Identity in initActorSaga:', identity);

//     // const canisterId =
//     //   process.env.CANISTER_ID_ICPACCELERATOR_BACKEND ||
//     //   process.env.ICPACCELERATOR_BACKEND_CANISTER_ID;

//       const canisterId = process.env.CANISTER_ID_BACKEND
      
//     const actor = yield call(createActor, canisterId, {
//       agentOptions: { identity },
//     });

//     // console.log('Actor initialized in initActorSaga:', actor);

//     yield put(setActor(actor));
//   } catch (error) {
//     console.error("Error in initActorSaga:", error);
//     yield put(actorError(error.toString()));
//   }
// }

// export function* actorSaga() {
//   yield takeLatest(handleActorRequest().type, initActorSaga);
// }
