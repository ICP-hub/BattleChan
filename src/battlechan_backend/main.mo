import Text "mo:base/Text";
import Principal "mo:base/Principal";
import Error "mo:base/Error";
import Nat32 "mo:base/Nat32";
import Trie "mo:base/Trie";
import List "mo:base/List";
import Array "mo:base/Array";

import Types "utils/types";
import { createBoardInfo } "controllers/board";
import { createUserInfo } "controllers/user";
import { createCommentInfo; updateLikedComments } "controllers/comment";
import { createPostInfo; updateVoteStatus } "controllers/post";
import { createReply; updateLikesInReplies } "controllers/reply";
import { getUniqueId; toBoardId; getPostIdFromCommentId } "utils/helper";
import { principalKey; textKey } "keys";

import { successMessage; notFound } "utils/message";

actor {

  private stable var userTrieMap = Trie.empty<Types.UserId, Types.UserInfo>();
  private stable var boardTrieMap = Trie.empty<Types.BoardName, Types.BoardInfo>();
  private stable var postTrieMap = Trie.empty<Types.PostId, Types.PostInfo>();

  public shared ({ caller = userId }) func createUserAccount(userReq : Types.UserReq) : async Types.Result {
    try {
      let userInfo : Types.UserInfo = createUserInfo(userId, userReq, userTrieMap);
      userTrieMap := Trie.put(userTrieMap, principalKey userId, Principal.equal, userInfo).0;
      #ok(successMessage.insert);

    } catch (e) {
      let code = Error.code(e);
      let message = Error.message(e);
      #err(code, message);
    };
  };

  public shared ({ caller = userId }) func createNewBoard(boardName : Text, boardDes : Text) : async Types.Result {
    try {
      let newBoard : Types.BoardInfo = createBoardInfo(userId, boardName, boardDes);
      let boardId = Text.toLowercase(Text.replace(boardName, #char ' ', "_"));
      boardTrieMap := Trie.put(boardTrieMap, textKey boardId, Text.equal, newBoard).0;
      #ok(successMessage.insert);

    } catch (e) {
      let code = Error.code(e);
      let message = Error.message(e);
      #err(code, message);
    };
  };

  public shared ({ caller = userId }) func createPost(boardName : Text, postData : Types.PostReq) : async Types.Result {
    try {
      let boardId = Text.toLowercase(Text.replace(boardName, #char ' ', "_"));
      let postId : Types.PostId = "#" # Nat32.toText(getUniqueId());

      let { updatedBoardInfo; updatedUserInfo; newPost } = createPostInfo(boardId, postId, userId, postData, userTrieMap, boardTrieMap);

      boardTrieMap := Trie.put(boardTrieMap, textKey boardId, Text.equal, updatedBoardInfo).0;
      userTrieMap := Trie.put(userTrieMap, principalKey userId, Principal.equal, updatedUserInfo).0;
      postTrieMap := Trie.put(postTrieMap, textKey postId, Text.equal, newPost).0;

      #ok(successMessage.insert);
    } catch (e) {
      let code = Error.code(e);
      let message = Error.message(e);
      #err(code, message);
    };
  };

  public shared ({ caller = userId }) func upvoteOrDownvotePost(boardName : Text, postId : Types.PostId, voteStatus : Types.VoteStatus) : async Types.Result {
    try {
      let { updatedUserInfo; updatedPostInfo } = updateVoteStatus(userId, voteStatus, postId, postTrieMap, userTrieMap);
      userTrieMap := Trie.put(userTrieMap, principalKey userId, Principal.equal, updatedUserInfo).0;
      postTrieMap := Trie.put(postTrieMap, textKey postId, Text.equal, updatedPostInfo).0;
      #ok(successMessage.update);
    } catch (e) {
      let code = Error.code(e);
      let message = Error.message(e);
      #err(code, message);
    };
  };
  public shared ({ caller = userId }) func createComment(postId : Types.PostId, comment : Text) : async Types.Result {
    try {
      let updatedPostInfo : Types.PostInfo = createCommentInfo(userId, postId, comment, userTrieMap, postTrieMap);
      postTrieMap := Trie.put(postTrieMap, textKey postId, Text.equal, updatedPostInfo).0;
      #ok(successMessage.insert);
    } catch (e) {
      let code = Error.code(e);
      let message = Error.message(e);
      #err(code, message);
    };
  };

  public shared ({ caller = userId }) func likeComment(postId : Types.PostId, commentId : Types.CommentId) : async Types.Result {
    try {
      let { updatedUserInfo; updatedPostInfo } = updateLikedComments(userId, postId, commentId, userTrieMap, postTrieMap);
      userTrieMap := Trie.put(userTrieMap, principalKey userId, Principal.equal, updatedUserInfo).0;
      postTrieMap := Trie.put(postTrieMap, textKey postId, Text.equal, updatedPostInfo).0;
      #ok(successMessage.update);
    } catch (e) {
      let code = Error.code(e);
      let message = Error.message(e);
      #err(code, message);
    };
  };
  public shared ({ caller = userId }) func createCommentReply(commentId : Types.CommentId, reply : Text) : async Types.Result {
    try {
      let postId = getPostIdFromCommentId(commentId);

      let { updatedPostInfo; updatedUserInfo } = createReply(userId, commentId, reply, userTrieMap, postTrieMap);
      userTrieMap := Trie.put(userTrieMap, principalKey userId, Principal.equal, updatedUserInfo).0;
      postTrieMap := Trie.put(postTrieMap, textKey postId, Text.equal, updatedPostInfo).0;
      #ok(successMessage.insert);
    } catch (e) {
      let message = Error.message(e);
      let code = Error.code(e);
      #err(code, message);
    };
  };

  public shared ({ caller = userId }) func likeCommentReply(commentId : Types.CommentId, replyId : Types.ReplyId) : async Types.Result {
    try {
      let postId = getPostIdFromCommentId(commentId);

      let postInfo : Types.PostInfo = updateLikesInReplies(userId, commentId, replyId, postTrieMap, userTrieMap);
      postTrieMap := Trie.put(postTrieMap, textKey postId, Text.equal, postInfo).0;

      #ok(successMessage.update);
    } catch (e) {
      let code = Error.code(e);
      let message = Error.message(e);
      #err(code, message);
    };
  };

  public shared query ({ caller = userId }) func getUserInfo() : async Types.Result_1<Types.UserInfo> {
    switch (Trie.get(userTrieMap, principalKey userId, Principal.equal)) {
      case (null) {
        { data = null; status = false; error = ?"Error! No user Exist" };
      };
      case (?userData) {
        { data = ?userData; status = true; error = null };
      };
    };
  };

  public shared query ({ caller = userId }) func getUserPost() : async Types.Result_1<[Types.PostInfo]> {
    let userPostIds : [Types.PostId] = switch (Trie.get(userTrieMap, principalKey userId, Principal.equal)) {
      case (null) {
        return { data = null; status = false; error = ?"No user found" };
      };
      case (?userData) { userData.postIds };
    };
    var allPosts : List.List<Types.PostInfo> = List.nil<Types.PostInfo>();
    for (postId in userPostIds.vals()) {
      let id = getPostIdFromCommentId(postId);
      switch (Trie.get(postTrieMap, textKey id, Text.equal)) {

        case (null) {};
        case (?postInfo) { allPosts := List.push(postInfo, allPosts) };
      };
    };
    return { data = ?List.toArray(allPosts); status = true; error = null };
  };

  public shared query ({}) func getSingleComment(commentId : Types.CommentId) : async Types.Result_1<Types.CommentInfo> {
    let postId : Types.PostId = getPostIdFromCommentId(commentId);
    let postInfo : Types.PostInfo = switch (Trie.get(postTrieMap, textKey postId, Text.equal)) {
      case (?value) { value };
      case (null) {
        return { data = null; status = false; error = ?notFound.noPost };
      };
    };

    switch (Trie.get(postInfo.comments, textKey commentId, Text.equal)) {
      case (?value) { return { data = ?value; status = true; error = null } };
      case (null) {
        return {
          data = null;
          status = false;
          error = ?notFound.noComment;
        };
      };
    };
  };

  public query func getAllCommentOfPost(postId : Types.PostId) : async Types.Result_1<[Types.CommentInfo]> {
    let postInfo : Types.PostInfo = switch (Trie.get(postTrieMap, textKey postId, Text.equal)) {
      case (?value) { value };
      case (null) {
        return { data = null; status = false; error = ?notFound.noPost };
      };
    };
    let allData = Trie.toArray<Types.CommentId, Types.CommentInfo, Types.CommentInfo>(postInfo.comments, func(k, v) = v);
    return { data = ?allData; status = true; error = null };
  };

  public query func getAllRepliesofComment(commentId : Types.CommentId) : async Types.Result_1<[Types.ReplyInfo]> {

    let postId : Types.PostId = getPostIdFromCommentId(commentId);
    let postInfo : Types.PostInfo = switch (Trie.get(postTrieMap, textKey postId, Text.equal)) {
      case (?value) { value };
      case (null) {
        return { data = null; status = false; error = ?notFound.noPost };
      };
    };
    let commentInfo : Types.CommentInfo = switch (Trie.get(postInfo.comments, textKey commentId, Text.equal)) {
      case (null) {
        return { data = null; status = false; error = ?notFound.noComment };
      };
      case (?comment) {
        comment;
      };
    };

    let allData = Trie.toArray<Types.ReplyId, Types.ReplyInfo, Types.ReplyInfo>(commentInfo.replies, func(k, v) = v);

    if (allData.size() == 0) {
      return { data = null; status = false; error = ?notFound.noData };
    };
    return { data = ?allData; status = true; error = null };
  };

  public query func getBoardsData() : async Types.Result_1<[{ boardName : Text; size : Nat }]> {

    let boardPostData = Trie.toArray<Text, Types.BoardInfo, { boardName : Text; size : Nat }>(boardTrieMap, func(k, v) = { boardName = v.boardName; size = Array.size(v.postIds) });

    if (Array.size(boardPostData) == 0) {
      return { data = null; status = false; error = ?notFound.noData };
    };
    return { data = ?boardPostData; status = true; error = null };
  };

  public shared query ({ caller }) func checkBoardExist(boardName : Text) : async Bool {
    let boardId = toBoardId(boardName);
    switch (Trie.get(boardTrieMap, textKey boardId, Text.equal)) {
      case (?board) { true };
      case (null) { false };
    };
  };

  //  function for the testing
  public func clearData() {
    userTrieMap := Trie.empty<Types.UserId, Types.UserInfo>();
    boardTrieMap := Trie.empty<Types.BoardName, Types.BoardInfo>();
    postTrieMap := Trie.empty<Types.PostId, Types.PostInfo>();

  };

};
