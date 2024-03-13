import Debug "mo:base/Debug";
import Principal "mo:base/Principal";
import Int "mo:base/Int";
import { now } "mo:base/Time";
import List "mo:base/List";
import Trie "mo:base/Trie";
import Text "mo:base/Text";
import Nat32 "mo:base/Nat32";

// thapa technical
// code step by step
// namaster javascript
import Types "../utils/types";
import { reject } "../utils/message";
import { anonymousCheck; checkText } "../utils/validations";
import { getUniqueId } "../utils/helper";
import { principalKey; textKey } "../keys";
module {
    public func createPostInfo(boardId : Types.BoardName, postId : Types.PostId, userId : Types.UserId, postReq : Types.PostReq, userTrieMap : Trie.Trie<Types.UserId, Types.UserInfo>, boardTrieMap : Trie.Trie<Types.BoardName, Types.BoardInfo>) : {
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
            replyIds = userInfo.replyIds;
            postIds = List.toArray(List.push(boardId # "_" # postId, List.fromArray(userInfo.postIds)));
            createdAt = userInfo.createdAt;
            updatedAt = ?Int.toText(now());
        };

        let newPost : Types.PostInfo = {
            postId = postId;
            postName = postReq.postName;
            postMetaData = postReq.postMetaData;
            upvotedBy = [];
            downvotedBy = [];
            upvotes = 0;
            downvotes = 0;
            comments = Trie.empty<Types.CommentId, Types.CommentInfo>();
            createdBy = userId;
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
    public func updateVoteStatus(userId : Types.UserId, voteStatus : Types.VoteStatus, postId : Types.PostId, postTrieMap : Trie.Trie<Types.PostId, Types.PostInfo>, userTrieMap : Trie.Trie<Types.UserId, Types.UserInfo>) : {
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
                        replyIds = userInfo.replyIds;
                        postIds = userInfo.postIds;
                        createdAt = userInfo.createdAt;
                        updatedAt = ?Int.toText(now());
                    };
                    updatedPostInfo : Types.PostInfo = {
                        postId = postInfo.postId;
                        postName = postInfo.postName;
                        upvotedBy = List.toArray(List.push(userId, List.fromArray(postInfo.upvotedBy)));
                        downvotedBy = postInfo.downvotedBy;
                        upvotes = postInfo.upvotes + 1;
                        downvotes = postInfo.downvotes;
                        postMetaData = postInfo.postMetaData;
                        createdBy = postInfo.createdBy;
                        comments = postInfo.comments;
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
                        replyIds = userInfo.replyIds;
                        postIds = userInfo.postIds;
                        createdAt = userInfo.createdAt;
                        updatedAt = ?Int.toText(now());
                    };

                    updatedPostInfo : Types.PostInfo = {
                        postId = postInfo.postId;
                        postName = postInfo.postName;
                        upvotedBy = postInfo.upvotedBy;
                        downvotedBy = List.toArray(List.push(userId, List.fromArray(postInfo.downvotedBy)));
                        upvotes = postInfo.upvotes;
                        downvotes = postInfo.downvotes + 1;
                        postMetaData = postInfo.postMetaData;
                        createdBy = postInfo.createdBy;
                        comments = postInfo.comments;
                        createdAt = postInfo.createdAt;
                        updatedAt = ?Int.toText(now());
                    };
                };
            };
        };

    };
};
