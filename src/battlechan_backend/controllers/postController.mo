import Debug "mo:base/Debug";
import Nat32 "mo:base/Nat32";
import Principal "mo:base/Principal";
import Int "mo:base/Int";
import HashMap "mo:base/HashMap";
import { now } "mo:base/Time";
import List "mo:base/List";

// thapa technical
// code step by step
// namaster javascript
import Types "../utils/types";
import { reject } "../utils/message";
import { anonymousCheck; checkText } "../utils/validations";
module {
    public func createPostInfo(userId : Types.UserId, postId : Types.PostId, postReq : Types.PostReq, userMap : HashMap.HashMap<Types.UserId, Types.UserInfo>) : Types.PostInfo {
        if (anonymousCheck(userId) == true) {
            Debug.trap(reject.anonymous);
        };

        if (checkText(postReq.postName, 50) == false) {
            Debug.trap(reject.noAccount);
        };

        let userInfo : Types.UserInfo = switch (userMap.get(userId)) {
            case (?value) { value };
            case (null) { Debug.trap(reject.noAccount) };
        };

        let updatedUserInfo : Types.UserInfo = {
            userId = userInfo.userId;
            userName = userInfo.userName;
            profileImg = userInfo.profileImg;
            postIds = List.toArray(List.push(postId, List.fromArray(userInfo.postIds)));
            createdAt = userInfo.createdAt;
            updatedAt = ?Int.toText(now());
        };
        
        ignore userMap.replace(userId, updatedUserInfo);

        let postInfo : Types.PostInfo = {
            postId = postId;
            postName = postReq.postName;
            postMetaData = postReq.postMetaData;
            createdBy = userId;
            createdAt = Int.toText(now());
            updatedAt = null;
        };

    };
};
