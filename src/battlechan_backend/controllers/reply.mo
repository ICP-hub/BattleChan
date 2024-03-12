import Types "../utils/types";
import Trie "mo:base/Trie";
import Text "mo:base/Text";
import { trap } "mo:base/Debug";
import { now } "mo:base/Time";
import Principal "mo:base/Principal";
import Int "mo:base/Int";
import Nat32 "mo:base/Nat32";
import List "mo:base/List";

import { reject } "../utils/message";
import { checkText } "../utils/validations";
import { getUniqueId; getPostIdFromCommentId } "../utils/helper";
import { principalKey; textKey } "../keys";
module {
    public func createReply(userId : Types.UserId, commentId : Types.CommentId, reply : Text, userTrieMap : Trie.Trie<Types.UserId, Types.UserInfo>, postTrieMap : Trie.Trie<Types.PostId, Types.PostInfo>) : {
        updatedPostInfo : Types.PostInfo;
        updatedUserInfo : Types.UserInfo;
    } {

        if (checkText(reply, 200) == false) {
            trap(reject.outBound);
        };
        let postId = getPostIdFromCommentId(commentId);
        let userInfo : Types.UserInfo = switch (Trie.get(userTrieMap, principalKey userId, Principal.equal)) {
            case (null) { trap(reject.noAccount) };
            case (?userData) { userData };
        };
        let postInfo = switch (Trie.get(postTrieMap, textKey postId, Text.equal)) {
            case (null) { trap(reject.noPost) };
            case (?postData) { postData };
        };
        let commentInfo = switch (Trie.get(postInfo.comments, textKey commentId, Text.equal)) {
            case (null) { trap(reject.noComment) };
            case (?postData) { postData };
        };

        let replyId = Nat32.toText(getUniqueId());
        let newReply : Types.ReplyInfo = {
            replyId;
            reply;
            likes = 0;
            createdAt = Int.toText(now());
            updatedAt = null;
        };
        let updatedReplyTrie : Trie.Trie<Types.ReplyId, Types.ReplyInfo> = Trie.put(commentInfo.replies, textKey replyId, Text.equal, newReply).0;

        let updatedCommentInfo : Types.CommentInfo = {
            commentId;
            comment = commentInfo.comment;
            likedBy = commentInfo.likedBy;
            replies = updatedReplyTrie;
            createdAt = commentInfo.createdAt;
            updatedAt = ?Int.toText(now());
        };

        let updatedPostInfo : Types.PostInfo = {
            postId = postInfo.postId;
            postName = postInfo.postName;
            upvotedBy = postInfo.upvotedBy;
            downvotedBy = postInfo.downvotedBy;
            upvotes = postInfo.upvotes + 1;
            downvotes = postInfo.downvotes;
            postMetaData = postInfo.postMetaData;
            createdBy = postInfo.createdBy;
            comments = Trie.put(postInfo.comments, textKey commentId, Text.equal, updatedCommentInfo).0;
            createdAt = postInfo.createdAt;
            updatedAt = ?Int.toText(now());

        };
        let updatedUserInfo : Types.UserInfo = {
            userId = userInfo.userId;
            userName = userInfo.userName;
            profileImg = userInfo.profileImg;
            upvotedTo = userInfo.upvotedTo;
            downvotedTo = userInfo.downvotedTo;
            likedComments = userInfo.likedComments;
            replyIds = List.toArray(List.push((commentId, replyId), List.fromArray(userInfo.replyIds)));
            postIds = userInfo.postIds;
            createdAt = userInfo.createdAt;
            updatedAt = ?Int.toText(now());
        };
        { updatedPostInfo; updatedUserInfo };
    };
};
