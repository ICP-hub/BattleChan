import { now } "mo:base/Time";
import Debug "mo:base/Debug";
import Int "mo:base/Int";
import Principal "mo:base/Principal";
import Trie "mo:base/Trie";

import Types "../utils/types";
import { checkText; anonymousCheck } "../utils/validations";
import { reject } "../utils/message";
import { principalKey } "../keys";

module {

    public func createUserInfo(userId : Types.UserId, userData : Types.UserReq, userTrieMap : Trie.Trie<Types.UserId, Types.UserInfo>) : Types.UserInfo {

        if (checkText(userData.userName, 100) == false) {
            Debug.trap(reject.outBound);
        };
        // if (anonymousCheck(userId) == true) {
        //     Debug.trap(reject.anonymous);
        // };

        switch (Trie.get(userTrieMap, principalKey userId, Principal.equal)) {
            case (?value) { Debug.trap(reject.alreadyExist) };
            case (null) {};
        };

        return {
            userId = userId;
            userName = userData.userName;
            profileImg = userData.profileImg;
            upvotedTo = [];
            downvotedTo = [];
            likedComments = [];
            createdComments = [];
            // boardIds = [];
            replyIds = [];
            postIds = [];
            createdAt = Int.toText(now());
            updatedAt = null;
        };
    };
    public func updateUserInfo(userId : Types.UserId, userData : Types.UserReq, userTrieMap : Trie.Trie<Types.UserId, Types.UserInfo>) : Types.UserInfo {
        if (checkText(userData.userName, 70) == false) {
            Debug.trap(reject.outBound);
        };
        // if (anonymousCheck(userId) == true) {
        //     Debug.trap(reject.anonymous);
        // };
        let userInfo :Types.UserInfo= switch (Trie.get(userTrieMap, principalKey userId, Principal.equal)) {
            case (?value) { value };
            case (null) {Debug.trap(reject.noAccount)};
        };
        return {
            userId = userInfo.userId;
            userName = userData.userName;
            profileImg = userData.profileImg;
            upvotedTo = userInfo.upvotedTo;
            downvotedTo = userInfo.downvotedTo;
            likedComments = userInfo.likedComments;
            createdComments = userInfo.createdComments;
            // boardIds = userInfo.boardIds;
            replyIds = userInfo.replyIds;
            postIds = userInfo.postIds;
            createdAt = userInfo.createdAt;
            updatedAt = ?Int.toText(now());
        }

    };
    // public func getAllUserPost(userId : Types.UserId, userTrieMap : Trie.Trie<Types.UserId, Types.UserInfo>, postTrieMap : Trie.Trie<Types.PostId, Types.PostInfo>) {
    //     switch (Trie.get(userTrieMap, principalKey userId, Principal.equal)) {
    //         case (null) {return };
    //         case (?userData) { userData.postIds};
    //     };
    // };
};
