import { all } from 'redux-saga/effects';
// import { walletSagas } from './AuthSaga';
// import { roleSaga } from './RoleSaga';
// import { allHubsSaga } from './AllHub';
import { internetIdentitySaga } from './InternetIdentitySaga';
import { actorSaga } from './actorBindSaga';
// import { userRoleSaga } from './userRoleSaga';
// import { fetchFounderSaga } from './founderSaga';
// import { fetchHubSaga } from './hubSaga';
// import { fetchInvestorSaga } from './investorSaga';
// import { fetchMentorSaga } from './mentorSaga';
// import { expertiseInSaga } from './areaOfExpertiseSaga';
// import { latestLiveProjectSaga } from './latestLiveSaga';
// import { latestListedProjectSaga } from './latestListedSaga';
// import { popularListedProjectSaga } from './popularListedSaga';
// import { popularLiveProjectSaga } from './popularLive';

// import { userCurrentRoleSaga } from './userCurrentRoleStatusSaga';

import { fetchUserSaga } from './userSaga';
// import { chainsSaga } from './multiChainSaga';



export default function* rootSaga() {
    yield all([
        // walletSagas(),
        // roleSaga(),
        // allHubsSaga(),
        internetIdentitySaga(),
        actorSaga(),
        // userRoleSaga(),
        fetchUserSaga(),
        // fetchFounderSaga(),
        // fetchHubSaga(),
        // fetchInvestorSaga(),
        // fetchMentorSaga(),
        // expertiseInSaga(),
        // chainsSaga(),
        // latestListedProjectSaga(),
        // latestLiveProjectSaga(),
        // popularListedProjectSaga(),
        // popularLiveProjectSaga(),
        // userCurrentRoleSaga()
    ]);
}
