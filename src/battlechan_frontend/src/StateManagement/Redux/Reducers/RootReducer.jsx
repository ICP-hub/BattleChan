import { combineReducers } from "@reduxjs/toolkit";
// import RoleReducer from "./RoleReducer";
// import AllHubReducer from "./All_IcpHubReducer";
import actorReducer from "./actorBindReducer";
import internetIdentityReducer from "./InternetIdentityReducer";
import userReducer from "./userRegisteredData";
// import mentorReducer from "./mentorRegisteredData";
// import hubReducer from "./hubRegisteredData";
// import investorReducer from "./investorRegisteredData";
// import projectReducer from "./founderRegisteredData";
// import areaOfExpertiseReducer from "./getAreaOfExpertise";
// import multiChainReducer from "./getMultiChainList";
// import latestListedReducer from "./latestListed";
// import latestLiveReducer from "./latestLive";
// import popularListedReducer from "./popularListed";
// import userCurrentRoleStatusReducer from "./userCurrentRoleStatusReducer";

const rootReducer = combineReducers({
  // role: RoleReducer,
  // hubs: AllHubReducer,
  actors: actorReducer,
  internet: internetIdentityReducer,
  current: userReducer,
  // mentorData: mentorReducer,
  // projectData: projectReducer,
  // userData: userReducer,
  // hubData: hubReducer,
  // investorData: investorReducer,
  // expertiseIn: areaOfExpertiseReducer,
  // chains: multiChainReducer,
  // latestListed: latestListedReducer,
  // latestLive: latestLiveReducer,
  // popularListed: popularListedReducer,
  // currentRoleStatus: userCurrentRoleStatusReducer
});

export default rootReducer;
