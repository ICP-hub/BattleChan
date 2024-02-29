import Types "../utils/types";
import { checkText; anonymousCheck } "../utils/validations";
import { reject } "../utils/message";
import { now } "mo:base/Time";
import Debug "mo:base/Debug";
import Nat "mo:base/Nat";
import Int "mo:base/Int";
import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";

module {
    func checkUserExist(userId : Principal, userMap : HashMap.HashMap<Types.UserId, Types.UserInfo>) {
        switch (userMap.get(userId)) {
            case (?userInfo) { Debug.trap(reject.alreadyExist) };
            case (null) {};
        };
    };
    public func createUserInfo(userId : Types.UserId, userData : Types.UserReq, userMap : HashMap.HashMap<Types.UserId, Types.UserInfo>) : Types.UserInfo {

        if (checkText(userData.userName, 70) == false) {
            Debug.trap(reject.outBound);
        };
        anonymousCheck(userId);
        checkUserExist(userId, userMap);

        let data : Types.UserInfo = {
            userId = userId;
            userName = userData.userName;
            profileImg = userData.profileImg;
            postId = [];
            createdAt = Int.toText(now());
            updatedAt = null;
        };
    };
};
