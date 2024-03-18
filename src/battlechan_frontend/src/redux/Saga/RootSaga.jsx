import { all } from 'redux-saga/effects';
 import { roleSaga } from './RoleSaga';
import { internetIdentitySaga } from './InternetIdentitySaga';
import { actorSaga } from './actorBindSaga';


export default function* rootSaga() {
    yield all([
        roleSaga(),
        internetIdentitySaga(),
        actorSaga(),
    ]);
}
