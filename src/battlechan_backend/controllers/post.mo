import Debug "mo:base/Debug";
import Principal "mo:base/Principal";
import Int "mo:base/Int";
import { now } "mo:base/Time";
import List "mo:base/List";
import Trie "mo:base/Trie";
import Text "mo:base/Text";
import Array "mo:base/Array";
// thapa technical
// code step by step
// namaster javascript
import Types "../utils/types";
import { reject } "../utils/message";
import { anonymousCheck; checkText } "../utils/validations";
import { checkVote; calcExpireTime; decreaseExpireTime; increaseExpireTime } "../utils/helper";
import { principalKey; textKey } "../keys";
module {

    public func createPostInfo(boardId : Types.BoardName, postId : Types.PostId, freePostTime : Int, userId : Types.UserId, postReq : Types.PostReq, userTrieMap : Trie.Trie<Types.UserId, Types.UserInfo>, boardTrieMap : Trie.Trie<Types.BoardName, Types.BoardInfo>) : {
        updatedBoardInfo : Types.BoardInfo;
        updatedUserInfo : Types.UserInfo;
        newPost : Types.PostInfo;
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
        let boardInfo : Types.BoardInfo = switch (Trie.get(boardTrieMap, textKey boardId, Text.equal)) {
            case (?board) { board };
            case (null) { Debug.trap(reject.invalidBoard) };
        };

        let updatedUserInfo : Types.UserInfo = {
            userId = userInfo.userId;
            userName = userInfo.userName;
            profileImg = userInfo.profileImg;
            upvotedTo = userInfo.upvotedTo;
            downvotedTo = userInfo.downvotedTo;
            likedComments = userInfo.likedComments;
            createdComments = userInfo.createdComments;
            replyIds = userInfo.replyIds;
            postIds = List.toArray(List.push(boardId # "-" # postId, List.fromArray(userInfo.postIds)));
            createdAt = userInfo.createdAt;
            updatedAt = ?Int.toText(now());
        };

        let newPost : Types.PostInfo = {
            postId = postId;
            postName = postReq.postName;
            postDes = postReq.postDes;
            postMetaData = postReq.postMetaData;
            upvotedBy = [];
            downvotedBy = [];
            upvotes = 0;
            downvotes = 0;
            comments = Trie.empty<Types.CommentId, Types.CommentInfo>();
            createdBy = userId;
            expireAt = calcExpireTime(freePostTime);
            createdAt = Int.toText(now());
            updatedAt = null;
        };

        let updatedBoardInfo : Types.BoardInfo = {
            boardName = boardInfo.boardName;
            boardDes = boardInfo.boardDes;
            postIds = List.toArray(List.push(postId, List.fromArray(boardInfo.postIds)));
            createdAt = boardInfo.createdAt;
            updatedAt = ?Int.toText(now());
        };
        return {
            updatedBoardInfo;
            updatedUserInfo;
            newPost;
        };
    };

    public func updateVoteStatus(userId : Types.UserId, voteTime : Int, voteStatus : Types.VoteStatus, postId : Types.PostId, postTrieMap : Trie.Trie<Types.PostId, Types.PostInfo>, userTrieMap : Trie.Trie<Types.UserId, Types.UserInfo>) : {
        updatedUserInfo : Types.UserInfo;
        updatedPostInfo : Types.PostInfo;
    } {
        if (anonymousCheck(userId) == true) {
            Debug.trap(reject.anonymous);
        };
        let userInfo : Types.UserInfo = switch (Trie.get(userTrieMap, principalKey userId, Principal.equal)) {
            case (?value) { value };
            case (null) { Debug.trap(reject.noAccount) };
        };
        let postInfo : Types.PostInfo = switch (Trie.get(postTrieMap, textKey postId, Text.equal)) {
            case (?value) { value };
            case (null) { Debug.trap(reject.noPost) };
        };

        if (checkVote<Types.PostId>(userInfo.upvotedTo, postId) == true) {
            Debug.trap(reject.alreadyVoted);
        };

        if (checkVote<Types.PostId>(userInfo.downvotedTo, postId) == true) {
            Debug.trap(reject.alreadyVoted);
        };

        switch (voteStatus) {
            case (#upvote) {
                return {
                    updatedUserInfo : Types.UserInfo = {
                        userId = userInfo.userId;
                        userName = userInfo.userName;
                        profileImg = userInfo.profileImg;
                        upvotedTo = List.toArray(List.push(postId, List.fromArray(userInfo.upvotedTo)));
                        downvotedTo = userInfo.downvotedTo;
                        likedComments = userInfo.likedComments;
                        createdComments = userInfo.createdComments;
                        replyIds = userInfo.replyIds;
                        postIds = userInfo.postIds;
                        createdAt = userInfo.createdAt;
                        updatedAt = ?Int.toText(now());
                    };
                    updatedPostInfo : Types.PostInfo = {
                        postId = postInfo.postId;
                        postName = postInfo.postName;
                        postDes = postInfo.postDes;
                        upvotedBy = List.toArray(List.push(userId, List.fromArray(postInfo.upvotedBy)));
                        downvotedBy = postInfo.downvotedBy;
                        upvotes = postInfo.upvotes + 1;
                        downvotes = postInfo.downvotes;
                        postMetaData = postInfo.postMetaData;
                        createdBy = postInfo.createdBy;
                        comments = postInfo.comments;
                        expireAt = increaseExpireTime(voteTime, postInfo.expireAt);
                        createdAt = postInfo.createdAt;
                        updatedAt = ?Int.toText(now());

                    };
                };
            };
            case (#downvote) {
                return {
                    updatedUserInfo : Types.UserInfo = {
                        userId = userInfo.userId;
                        userName = userInfo.userName;
                        profileImg = userInfo.profileImg;
                        upvotedTo = userInfo.upvotedTo;
                        downvotedTo = List.toArray(List.push(postId, List.fromArray(userInfo.upvotedTo)));
                        likedComments = userInfo.likedComments;
                        createdComments = userInfo.createdComments;
                        replyIds = userInfo.replyIds;
                        postIds = userInfo.postIds;
                        createdAt = userInfo.createdAt;
                        updatedAt = ?Int.toText(now());
                    };

                    updatedPostInfo : Types.PostInfo = {
                        postId = postInfo.postId;
                        postName = postInfo.postName;
                        postDes = postInfo.postDes;
                        upvotedBy = postInfo.upvotedBy;
                        downvotedBy = List.toArray(List.push(userId, List.fromArray(postInfo.downvotedBy)));
                        upvotes = postInfo.upvotes;
                        downvotes = postInfo.downvotes + 1;
                        postMetaData = postInfo.postMetaData;
                        createdBy = postInfo.createdBy;
                        comments = postInfo.comments;
                        expireAt = decreaseExpireTime(voteTime, postInfo.expireAt);
                        createdAt = postInfo.createdAt;
                        updatedAt = ?Int.toText(now());
                    };
                };
            };
        };

    };
    public func updatePostExpireTime(postIdTimerIdTrie : Trie.Trie<Types.PostId, Nat>, time : Nat, postId : Types.PostId, postTrieMap : Trie.Trie<Types.PostId, Types.PostInfo>) : Trie.Trie<Types.PostId, Types.PostInfo> {

        let postInfo : Types.PostInfo = switch (Trie.get(postTrieMap, textKey postId, Text.equal)) {
            case (?v) { v };
            case (null) { Debug.trap(reject.noPost) };
        };
        switch (Trie.get(postIdTimerIdTrie, textKey postId, Text.equal)) {
            case (?value) {};
            case (null) { Debug.trap(reject.noPost) };
        };
        let updatedPostInfo : Types.PostInfo = {
            postId = postInfo.postId;
            postName = postInfo.postName;
            postDes = postInfo.postDes;
            upvotedBy = postInfo.upvotedBy;
            downvotedBy = postInfo.downvotedBy;
            upvotes = postInfo.upvotes;
            downvotes = postInfo.downvotes + 1;
            postMetaData = postInfo.postMetaData;
            createdBy = postInfo.createdBy;
            comments = postInfo.comments;
            expireAt = increaseExpireTime(time, postInfo.expireAt);
            createdAt = postInfo.createdAt;
            updatedAt = ?Int.toText(now());
        };
        return Trie.put(postTrieMap, textKey postId, Text.equal, updatedPostInfo).0;
    };
    public func archivePost(userId : Types.UserId, postId : Types.PostId, userTrieMap : Trie.Trie<Types.UserId, Types.UserInfo>, postTrieMap : Trie.Trie<Types.PostId, Types.PostInfo>) : async {
        updatedUserTrieMap : Trie.Trie<Types.UserId, Types.UserInfo>;
        updatedPostTrieMap : Trie.Trie<Types.PostId, Types.PostInfo>;
    } {

        let userInfo : Types.UserInfo = switch (Trie.get(userTrieMap, principalKey userId, Principal.equal)) {
            case (?value) { value };
            case (null) { Debug.trap(reject.noAccount) };
        };
        let updatedPostIds = Array.filter<Types.PostId>(userInfo.postIds, func x = x == postId);
        let updateUserInfo : Types.UserInfo = {
            userId = userInfo.userId;
            userName = userInfo.userName;
            profileImg = userInfo.profileImg;
            upvotedTo = List.toArray(List.push(postId, List.fromArray(userInfo.upvotedTo)));
            downvotedTo = userInfo.downvotedTo;
            likedComments = userInfo.likedComments;
            createdComments = userInfo.createdComments;
            replyIds = userInfo.replyIds;
            postIds = updatedPostIds;
            createdAt = userInfo.createdAt;
            updatedAt = ?Int.toText(now());
        };
        let updatedUserTrieMap : Trie.Trie<Types.UserId, Types.UserInfo> = Trie.put(userTrieMap, principalKey userId, Principal.equal, updateUserInfo).0;
        let updatedPostTrieMap : Trie.Trie<Types.PostId, Types.PostInfo> = Trie.remove(postTrieMap, textKey postId, Text.equal).0;

        return { updatedUserTrieMap; updatedPostTrieMap }

    };
};
