import { now } "mo:base/Time";
import Debug "mo:base/Debug";
import Nat "mo:base/Nat";
import Int "mo:base/Int";
import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";

import Types "../utils/types";
import { checkText; anonymousCheck; checkKeyExist } "../utils/validations";
import { reject } "../utils/message";

module {

    public func createUserInfo(userId : Types.UserId, userData : Types.UserReq, userMap : HashMap.HashMap<Types.UserId, Types.UserInfo>) : Types.UserInfo {

        if (checkText(userData.userName, 70) == false) {
            Debug.trap(reject.outBound);
        };
        if (anonymousCheck(userId) == true) {
            Debug.trap(reject.anonymous);
        };
        if (checkKeyExist<Types.UserId, Types.UserInfo>(userId, userMap) == true) {
            Debug.trap(reject.alreadyExist);
        };

        let data : Types.UserInfo = {
            userId = userId;
            userName = userData.userName;
            profileImg = userData.profileImg;
            postIds = [];
            createdAt = Int.toText(now());
            updatedAt = null;
        };
    };
};
