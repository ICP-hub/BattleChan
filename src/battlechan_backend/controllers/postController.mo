import Debug "mo:base/Debug";
import Nat32 "mo:base/Nat32";
import Principal "mo:base/Principal";
import Int "mo:base/Int";
import HashMap "mo:base/HashMap";
import { now } "mo:base/Time";
import List "mo:base/List";
import Trie "mo:base/Trie";

// thapa technical
// code step by step
// namaster javascript
import Types "../utils/types";
import { reject } "../utils/message";
import { anonymousCheck; checkText } "../utils/validations";
import { principalKey } "../keys";
module {
    public func createPostInfo(userId : Types.UserId, postId : Types.PostId, postReq : Types.PostReq, userTrieMap : Trie.Trie<Types.UserId, Types.UserInfo>) : {
        postInfo : Types.PostInfo;
        updatedUserInfo : Types.UserInfo;
    } {
        if (anonymousCheck(userId) == true) {
            Debug.trap(reject.anonymous);
        };

        if (checkText(postReq.postName, 50) == false) {
            Debug.trap(reject.noAccount);
        };

        let userInfo : Types.UserInfo = switch (Trie.get(userTrieMap, principalKey userId, Principal.equal)) {
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

        let postInfo : Types.PostInfo = {
            postId = postId;
            postName = postReq.postName;
            postMetaData = postReq.postMetaData;
            createdBy = userId;
            createdAt = Int.toText(now());
            updatedAt = null;
        };
        {
            postInfo;
            updatedUserInfo;
        };

    };
};
