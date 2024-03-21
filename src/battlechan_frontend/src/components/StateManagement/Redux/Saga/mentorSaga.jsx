import { takeLatest, call, put, select } from "redux-saga/effects";
import { mentorRegisteredHandlerFailure,mentorRegisteredHandlerRequest, mentorRegisteredHandlerSuccess } from "../Reducers/mentorRegisteredData";


const selectActor = (currState) => currState.actors.actor;



function uint8ArrayToBase64(uint8Arr) {

  // console.log('image in mentor >>>>>',uint8Arr);
  let buffer = Buffer.from(uint8Arr[0]);
  // console.log("buffer ==========>",buffer)
  const decryptedBlob = new Blob([buffer]);
  const url = URL.createObjectURL(decryptedBlob)
  return url
}


function* fetchMentorHandler() {
  try {

    const actor = yield select(selectActor);
    // console.log('mentorFullData actor => => => ', actor)

    const mentorData = yield call([actor, actor.get_mentor_candid]);

    // console.log('mentorData functn run hua => ', mentorData)

    const updatedMentorData = mentorData.map((mentor) => ({
      ...mentor,
      mentor_image: uint8ArrayToBase64(mentor.mentor_image),
    }));

    yield put(mentorRegisteredHandlerSuccess(updatedMentorData));
  } catch (error) {
    yield put(mentorRegisteredHandlerFailure(error.toString()));
  }
}

export function* fetchMentorSaga() {
  yield takeLatest(mentorRegisteredHandlerRequest.type, fetchMentorHandler);
}
