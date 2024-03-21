import Text "mo:base/Text";
import Principal "mo:base/Principal";
import Error "mo:base/Error";
import Nat32 "mo:base/Nat32";
import Trie "mo:base/Trie";
import List "mo:base/List";
import Array "mo:base/Array";
import Timer "mo:base/Timer";
import Debug "mo:base/Debug";
import { abs } "mo:base/Int";
import { now } "mo:base/Time";
// import payment "./token/main";

import Types "utils/types";
import { createBoardInfo } "controllers/board";
import { createUserInfo } "controllers/user";
import { createCommentInfo; updateLikedComments } "controllers/comment";
import { createPostInfo; updateVoteStatus; archivePost } "controllers/post";
import { createReply; updateLikesInReplies } "controllers/reply";
import { getUniqueId; toBoardId; getPostIdFromCommentId; getPostId; paginate } "utils/helper";
import { principalKey; textKey } "keys";

import Token "./token/token";
import { successMessage; notFound } "utils/message";

actor {

  private stable var userTrieMap = Trie.empty<Types.UserId, Types.UserInfo>();
  private stable var boardTrieMap = Trie.empty<Types.BoardName, Types.BoardInfo>();
  private stable var postTrieMap = Trie.empty<Types.PostId, Types.PostInfo>();
  private stable var postIdTimerIdTrie = Trie.empty<Types.PostId, Nat>();
  private stable var userAchivedPostMap = Trie.empty<Types.UserId, Trie.Trie<Types.PostId, Types.PostInfo>>();
  private stable let freePostTime = 5;
  private stable let voteTime = 1;
  private let paymentCanisterId = Principal.fromText("be2us-64aaa-aaaaa-qaabq-cai");

  let tokenCanisterId = "br5f7-7uaaa-aaaaa-qaaca-cai";
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

      let { updatedBoardInfo; updatedUserInfo; newPost } = createPostInfo(boardId, postId, freePostTime, userId, postData, userTrieMap, boardTrieMap);
      let timerId = Timer.setTimer<system>(
        #seconds(freePostTime * 60 - abs(now() / 1_000_000_000) % freePostTime * 60),
        func() : async () {
          let { updatedPostTrieMap; updatedUserTrieMap } = await archivePost(userId, postId, userTrieMap, postTrieMap);
          postIdTimerIdTrie := Trie.remove(postIdTimerIdTrie, textKey postId, Text.equal).0;
          userTrieMap := updatedUserTrieMap;
          postTrieMap := updatedPostTrieMap;

        },
      );
      postIdTimerIdTrie := Trie.put(postIdTimerIdTrie, textKey postId, Text.equal, timerId).0;
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
  public shared ({ caller = userId }) func updatePostVisiblity(time : Nat, postId : Types.PostId) : async Types.Result {
    try {
      let timeId = switch (Trie.get(postIdTimerIdTrie, textKey postId, Text.equal)) {
        case (null) { Debug.trap("noPostFound") };
        case (?v) { v };
      };
      Timer.cancelTimer(timeId);
      let timer = Timer.setTimer<system>(
        #seconds(time * 60 - abs(now() / 1_000_000_000) % time * 60),
        func() : async () {
          let { updatedPostTrieMap; updatedUserTrieMap } = await archivePost(userId, postId, userTrieMap, postTrieMap);
          userTrieMap := updatedUserTrieMap;
          postTrieMap := updatedPostTrieMap;
        },
      );
      #ok("successfully added Time");
    } catch (e) {
      let code = Error.code(e);
      let message = Error.message(e);
      #err(code, message);
    };
  };

  public shared ({ caller = userId }) func upvoteOrDownvotePost(postId : Types.PostId, voteStatus : Types.VoteStatus) : async Types.Result {
    try {
      let { updatedUserInfo; updatedPostInfo } = updateVoteStatus(userId, voteTime, voteStatus, postId, postTrieMap, userTrieMap);

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
      let { updatedPostInfo; updatedUserInfo } = createCommentInfo(userId, postId, comment, userTrieMap, postTrieMap);

      postTrieMap := Trie.put(postTrieMap, textKey postId, Text.equal, updatedPostInfo).0;
      userTrieMap := Trie.put(userTrieMap, principalKey userId, Principal.equal, updatedUserInfo).0;

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
        return { data = null; status = false; error = ?notFound.noPost };
      };
      case (?userData) { userData.postIds };
    };

    var allPosts : List.List<Types.PostInfo> = List.nil<Types.PostInfo>();

    for (postId in userPostIds.vals()) {
      let id = getPostId(postId);
      switch (Trie.get(postTrieMap, textKey id, Text.equal)) {
        case (null) { Debug.trap("No element of the this data found! " # id) };
        case (?postInfo) { allPosts := List.push(postInfo, allPosts) };
      };
    };

    if (List.size(allPosts) == 0) {
      return { data = null; status = false; error = ?notFound.noData };
    };

    return { data = ?List.toArray(allPosts); status = true; error = null };
  };

  public query func getPostInfo(postId : Types.PostId) : async Types.Result_1<Types.PostInfo> {

    let postInfo : Types.PostInfo = switch (Trie.get(postTrieMap, textKey postId, Text.equal)) {
      case (?value) { value };
      case (null) {
        return { data = null; status = false; error = ?notFound.noPost };
      };
    };

    { data = ?postInfo; status = true; error = null };
  };

  public query func getSingleComment(commentId : Types.CommentId) : async Types.Result_1<Types.CommentInfo> {

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

  public query func getAllCommentOfPost(postId : Types.PostId, chunk_size : Nat, pageNo : Nat) : async Types.Result_1<[Types.CommentInfo]> {

    let postInfo : Types.PostInfo = switch (Trie.get(postTrieMap, textKey postId, Text.equal)) {
      case (?value) { value };
      case (null) {
        return { data = null; status = false; error = ?notFound.noPost };
      };
    };

    let allData : [Types.CommentInfo] = Trie.toArray<Types.CommentId, Types.CommentInfo, Types.CommentInfo>(postInfo.comments, func(k, v) = v);

    let paginatedData = paginate<Types.CommentInfo>(allData, chunk_size);

    if (paginatedData.size() < pageNo) {
      return { data = null; status = false; error = ?notFound.noPageExist };
    };

    let page = paginatedData[pageNo];

    return { data = ?page; status = true; error = null };
  };

  public query func getAllRepliesofComment(commentId : Types.CommentId, chunk_size : Nat, pageNo : Nat) : async Types.Result_1<[Types.ReplyInfo]> {

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

    let page = paginate<Types.ReplyInfo>(allData, chunk_size);

    if (page.size() < pageNo) {
      return { data = null; status = false; error = ?notFound.noPageExist };
    };

    return { data = ?allData; status = true; error = null };
  };

  public query func getTotalPostInBoard() : async Types.Result_1<[{ boardName : Text; size : Nat }]> {

    let boardPostData = Trie.toArray<Text, Types.BoardInfo, { boardName : Text; size : Nat }>(boardTrieMap, func(k, v) = { boardName = v.boardName; size = Array.size(v.postIds) });

    if (Array.size(boardPostData) == 0) {
      return { data = null; status = false; error = ?notFound.noData };
    };
    return { data = ?boardPostData; status = true; error = null };
  };

  public query func checkBoardExist(boardName : Text) : async Bool {
    let boardId = toBoardId(boardName);
    switch (Trie.get(boardTrieMap, textKey boardId, Text.equal)) {
      case (?board) { true };
      case (null) { false };
    };
  };

  ///  functionality for the token
  // public func mintToken(amount:Nat) : async Text {
  //   payment
  // };
  let ledger = actor (tokenCanisterId) : Token.Token;

  public func burnToken(amount : Nat) : async Token.Result_2 {
    await ledger.icrc1_transfer({
      to = {
        owner = paymentCanisterId;
        subaccount = null;
      };
      fee = null;
      memo = null;
      from_subaccount = null;
      created_at_time = null;
      amount;
    });
  };

  public func icrc2_approve(amount : Nat) : async Token.Result_1 {
    await ledger.icrc2_approve {
      from_subaccount = null;
      spender = {
        owner = Principal.fromText("rzo6e-othar-as4dz-5dm3l-5mlxo-q7w3x-5ol3f-74pvr-s2mbw-vdigk-yae");
        subaccount = null;
      };
      amount;
      expected_allowance = null;
      expires_at = null;
      fee = null;
      memo = null;
      created_at_time = null;
    };
  };

  //  function for the testing
  public func clearData() {
    userTrieMap := Trie.empty<Types.UserId, Types.UserInfo>();
    boardTrieMap := Trie.empty<Types.BoardName, Types.BoardInfo>();
    postTrieMap := Trie.empty<Types.PostId, Types.PostInfo>();

  };

};
