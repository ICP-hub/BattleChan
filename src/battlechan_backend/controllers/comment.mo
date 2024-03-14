import Trie "mo:base/Trie";
import Principal "mo:base/Principal";
import { trap } "mo:base/Debug";
import Text "mo:base/Text";
import Nat32 "mo:base/Nat32";
import Int "mo:base/Int";
import { now } "mo:base/Time";
import Debug "mo:base/Debug";
import List "mo:base/List";
import Result "mo:base/Result";

import Types "../utils/types";

import { reject } "../utils/message";
import { checkText } "../utils/validations";
import { getUniqueId; getPostIdFromCommentId } "../utils/helper";
import { principalKey; textKey } "../keys";

module {
    public func createCommentInfo(userId : Types.UserId, postId : Types.PostId, comment : Text, userTrieMap : Trie.Trie<Types.UserId, Types.UserInfo>, postTrieMap : Trie.Trie<Types.PostId, Types.PostInfo>) : Types.PostInfo {
        if (checkText(comment, 200) == false) {
            trap(reject.outBound);
        };
        let userInfo : Types.UserInfo = switch (Trie.get(userTrieMap, principalKey userId, Principal.equal)) {
            case (null) { trap(reject.noAccount) };
            case (?userData) { userData };
        };
        let postInfo = switch (Trie.get(postTrieMap, textKey postId, Text.equal)) {
            case (null) { trap(reject.noPost) };
            case (?postData) { postData };
        };
        let commentId = postId # "_" # Nat32.toText(getUniqueId());
        let newComment : Types.CommentInfo = {
            commentId;
            comment;
            likedBy = [];
            replies = Trie.empty<Types.ReplyId, Types.ReplyInfo>();
            createdAt = Int.toText(now());
            updatedAt = null;
        };

        let updatedPostInfo : Types.PostInfo = {
            postId = postInfo.postId;
            postName = postInfo.postName;
            postDes = postInfo.postDes;
            upvotedBy = postInfo.upvotedBy;
            downvotedBy = postInfo.downvotedBy;
            upvotes = postInfo.upvotes + 1;
            downvotes = postInfo.downvotes;
            postMetaData = postInfo.postMetaData;
            createdBy = postInfo.createdBy;
            comments = Trie.put(postInfo.comments, textKey commentId, Text.equal, newComment).0;
            createdAt = postInfo.createdAt;
            updatedAt = ?Int.toText(now());

        };
        return updatedPostInfo;
    };
    public func updateLikedComments(userId : Types.UserId, postId : Types.PostId, commentId : Types.CommentId, userTrieMap : Trie.Trie<Types.UserId, Types.UserInfo>, postTrieMap : Trie.Trie<Types.PostId, Types.PostInfo>) : {
        updatedPostInfo : Types.PostInfo;
        updatedUserInfo : Types.UserInfo;
    } {
        let userInfo : Types.UserInfo = switch (Trie.get(userTrieMap, principalKey userId, Principal.equal)) {
            case (?value) { value };
            case (null) { Debug.trap(reject.noAccount) };
        };
        let postInfo : Types.PostInfo = switch (Trie.get(postTrieMap, textKey postId, Text.equal)) {
            case (?value) { value };
            case (null) { Debug.trap(reject.noPost) };
        };
        let commentInfo : Types.CommentInfo = switch (Trie.get(postInfo.comments, textKey commentId, Text.equal)) {
            case (?value) { value };
            case (null) { Debug.trap(reject.noPost) };
        };
        let updatedUserInfo : Types.UserInfo = {
            userId = userInfo.userId;
            userName = userInfo.userName;
            profileImg = userInfo.profileImg;
            upvotedTo = userInfo.upvotedTo;
            downvotedTo = userInfo.downvotedTo;
            likedComments = List.toArray(List.push(commentId, List.fromArray(userInfo.likedComments)));
            replyIds = userInfo.replyIds;
            postIds = userInfo.postIds;
            createdAt = userInfo.createdAt;
            updatedAt = ?Int.toText(now());
        };
        let updatedCommentInfo : Types.CommentInfo = {
            commentId = commentInfo.commentId;
            comment = commentInfo.comment;
            likedBy = List.toArray(List.push(userId, List.fromArray(commentInfo.likedBy)));
            replies = commentInfo.replies;
            createdAt = commentInfo.createdAt;
            updatedAt = ?Int.toText(now());
        };
        let updatedCommentTrie : Trie.Trie<Types.CommentId, Types.CommentInfo> = Trie.put(postInfo.comments, textKey commentId, Text.equal, updatedCommentInfo).0;
        let updatedPostInfo : Types.PostInfo = {
            postId = postInfo.postId;
            postName = postInfo.postName;
            postDes = postInfo.postDes;
            upvotedBy = postInfo.upvotedBy;
            downvotedBy = postInfo.downvotedBy;
            upvotes = postInfo.upvotes;
            downvotes = postInfo.downvotes;
            postMetaData = postInfo.postMetaData;
            createdBy = postInfo.createdBy;
            comments = updatedCommentTrie;
            createdAt = postInfo.createdAt;
            updatedAt = ?Int.toText(now());
        };

        { updatedPostInfo; updatedUserInfo };
    };

};
