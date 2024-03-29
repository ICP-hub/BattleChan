import Text "mo:base/Text";
import Principal "mo:base/Principal";
import Error "mo:base/Error";
import Nat32 "mo:base/Nat32";
import Trie "mo:base/Trie";
import List "mo:base/List";
import Array "mo:base/Array";
import Timer "mo:base/Timer";
import Debug "mo:base/Debug";
import Char "mo:base/Char";
import { abs } "mo:base/Int";
import { now } "mo:base/Time";
import TrieMap "mo:base/TrieMap";

import Types "utils/types";
import Search "./controllers/search";
import { createBoardInfo } "controllers/board";
import { createUserInfo; updateUserInfo } "controllers/user";
import { createCommentInfo; updateLikedComments } "controllers/comment";
import {
  createPostInfo;
  updateVoteStatus;
  archivePost;
  postVisiblity;
  bubbleSortPost;
} "controllers/post";
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
  private stable var userAchivedPostTrie = Trie.empty<Types.UserId, List.List<Types.PostInfo>>();
  private stable let freePostTime = 5;
  private stable let voteTime = 1;
  stable var postNameRootNode : Search.Node = Search.createNode();

  // private let paymentCanisterId = Principal.fromText("be2us-64aaa-aaaaa-qaabq-cai");

  let tokenCanisterId = "bw4dl-smaaa-aaaaa-qaacq-cai";

  public shared ({ caller = userId }) func createUserAccount(userReq : Types.UserReq) : async Types.Result {
    try {
      let userId : Principal = Principal.fromText("bkyz2-fmaaa-aaaaa-qaaaq-cai");
      let userInfo : Types.UserInfo = createUserInfo(userId, userReq, userTrieMap);

      userTrieMap := Trie.put(userTrieMap, principalKey userId, Principal.equal, userInfo).0;

      #ok(successMessage.insert);
    } catch (e) {

      let code = Error.code(e);
      let message = Error.message(e);

      #err(code, message);
    };
  };
  public shared ({ caller = userId }) func updatedUserAccount(userReq : Types.UserReq) : async Types.Result {
    try {
      let userId : Principal = Principal.fromText("bkyz2-fmaaa-aaaaa-qaaaq-cai");
      let userInfo : Types.UserInfo = updateUserInfo(userId, userReq, userTrieMap);
      userTrieMap := Trie.put(userTrieMap, principalKey userId, Principal.equal, userInfo).0;
      #ok(successMessage.update);
    } catch (e) {
      let code = Error.code(e);
      let message = Error.message(e);
      #err(code, message);
    };
  };

  public shared ({ caller = userId }) func createNewBoard(boardName : Text, boardDes : Text) : async Types.Result {
    try {
      let userId : Principal = Principal.fromText("bkyz2-fmaaa-aaaaa-qaaaq-cai");
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

  func insertNameNode(postName : Text, userId : Text) : () {
    var newNode : Search.Node = postNameRootNode;
    for (char in Text.toIter(postName)) {
      let data = Char.toText(char);
      switch (Trie.get(newNode.children, Search.textKey data, Text.equal)) {
        case (null) {
          newNode.children := Trie.put(newNode.children, Search.textKey data, Text.equal, Search.createNode()).0;
        };
        case (?_) {};
      };
      switch (Trie.get(newNode.children, Search.textKey data, Text.equal)) {
        case (?node) { newNode := node };
        case (null) { () };
      };
    };
    newNode.isEndOfWord := true;
    newNode.user := Array.append<Text>(newNode.user, [userId]);
  };

  public shared ({ caller = userId }) func createPost(boardName : Text, postData : Types.PostReq) : async Types.Result {
    try {
      let userId : Principal = Principal.fromText("bkyz2-fmaaa-aaaaa-qaaaq-cai");
      let boardId = Text.toLowercase(Text.replace(boardName, #char ' ', "_"));
      let postId : Types.PostId = "#" # Nat32.toText(getUniqueId());
      insertNameNode(postData.postName, postId);
      let { updatedBoardInfo; updatedUserInfo; newPost } = createPostInfo(boardId, postId, freePostTime, userId, postData, userTrieMap, boardTrieMap);
      let timerId = Timer.setTimer<system>(
        #seconds(freePostTime * 60 - abs(now() / 1_000_000_000) % freePostTime * 60),
        func() : async () {
          let { updatedPostTrie; updatedUserTrie; updatedArchivedTrie } = archivePost(userId, postId, userTrieMap, postTrieMap, userAchivedPostTrie);
          postIdTimerIdTrie := Trie.remove(postIdTimerIdTrie, textKey postId, Text.equal).0;
          userTrieMap := updatedUserTrie;
          postTrieMap := updatedPostTrie;
          userAchivedPostTrie := updatedArchivedTrie;
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

  public shared ({ caller = userId }) func updatePostVisiblity(time : Int, postId : Types.PostId) : async Types.Result {
    try {
      let timeId = switch (Trie.get(postIdTimerIdTrie, textKey postId, Text.equal)) {
        case (null) { Debug.trap("noPostFound") };
        case (?v) { v };
      };

      let { updatedPostTrieMap; updatedExpireTime } = postVisiblity(postId, postTrieMap, time);
      postTrieMap := updatedPostTrieMap;

      Timer.cancelTimer(timeId);

      let updatedTimerId = Timer.setTimer<system>(

        #seconds(updatedExpireTime * 60 - abs(now() / 1_000_000_000) % updatedExpireTime * 60),
        func() : async () {
          let { updatedPostTrie; updatedUserTrie; updatedArchivedTrie } = archivePost(userId, postId, userTrieMap, postTrieMap, userAchivedPostTrie);
          userTrieMap := updatedUserTrie;
          postTrieMap := updatedPostTrie;
          userAchivedPostTrie := updatedArchivedTrie;
          postIdTimerIdTrie := Trie.remove(postIdTimerIdTrie, textKey postId, Text.equal).0;

        },
      );

      postIdTimerIdTrie := Trie.put(postIdTimerIdTrie, textKey postId, Text.equal, updatedTimerId).0;

      #ok("successfully added Time");
    } catch (e) {
      let code = Error.code(e);
      let message = Error.message(e);
      #err(code, message);
    };
  };

  public shared ({ caller = userId }) func upvoteOrDownvotePost(postId : Types.PostId, voteStatus : Types.VoteStatus) : async Types.Result {
    try {
      let userId : Principal = Principal.fromText("bkyz2-fmaaa-aaaaa-qaaaq-cai");
      let { updatedUserInfo; updatedPostInfo; updateExpireTime } = await updateVoteStatus(userId, voteTime, voteStatus, postId, postTrieMap, userTrieMap);

      let timeId = switch (Trie.get(postIdTimerIdTrie, textKey postId, Text.equal)) {
        case (null) { Debug.trap("noPostFound") };
        case (?v) { v };
      };

      userTrieMap := Trie.put(userTrieMap, principalKey userId, Principal.equal, updatedUserInfo).0;
      postTrieMap := Trie.put(postTrieMap, textKey postId, Text.equal, updatedPostInfo).0;

      Timer.cancelTimer(timeId);

      let updatedTimerId = Timer.setTimer<system>(

        #seconds(updateExpireTime * 60 - abs(now() / 1_000_000_000) % updateExpireTime * 60),
        func() : async () {
          let { updatedPostTrie; updatedUserTrie; updatedArchivedTrie } = archivePost(userId, postId, userTrieMap, postTrieMap, userAchivedPostTrie);

          userTrieMap := updatedUserTrie;
          postTrieMap := updatedPostTrie;
          userAchivedPostTrie := updatedArchivedTrie;
          postIdTimerIdTrie := Trie.remove(postIdTimerIdTrie, textKey postId, Text.equal).0;

        },
      );
      postIdTimerIdTrie := Trie.put(postIdTimerIdTrie, textKey postId, Text.equal, updatedTimerId).0;

      #ok(successMessage.update);
    } catch (e) {

      let code = Error.code(e);
      let message = Error.message(e);

      #err(code, message);
    };
  };

  public shared ({ caller = userId }) func createComment(postId : Types.PostId, comment : Text) : async Types.Result {
    try {
      let userId : Principal = Principal.fromText("bkyz2-fmaaa-aaaaa-qaaaq-cai");
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
      let userId : Principal = Principal.fromText("bkyz2-fmaaa-aaaaa-qaaaq-cai");
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
      let userId : Principal = Principal.fromText("bkyz2-fmaaa-aaaaa-qaaaq-cai");
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
      let userId : Principal = Principal.fromText("bkyz2-fmaaa-aaaaa-qaaaq-cai");
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
    let userId : Principal = Principal.fromText("bkyz2-fmaaa-aaaaa-qaaaq-cai");
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

    let userId : Principal = Principal.fromText("bkyz2-fmaaa-aaaaa-qaaaq-cai");
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

  public query func searchPost(postName : Text) : async [Text] {
    var node = postNameRootNode;
    var result : [Text] = [];
    for (char in Text.toIter(postName)) {
      let data = Char.toText(char);
      switch (Trie.get(node.children, Search.textKey data, Text.equal)) {
        case (null) return result;
        case (?childNode) node := childNode;
      };
    };
    result := Search.collectUsers(node, result);
    return result;
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

  public shared ({ caller = userId }) func getArchivedPost(chunk_size : Nat, pageNo : Nat) : async Types.Result_1<[Types.PostInfo]> {
    let userId : Principal = Principal.fromText("bkyz2-fmaaa-aaaaa-qaaaq-cai");
    let postArray : [Types.PostInfo] = switch (Trie.get(userAchivedPostTrie, principalKey userId, Principal.equal)) {
      case (null) {
        return { data = null; status = true; error = ?notFound.noPost };
      };
      case (?result) { List.toArray(result) };
    };
    if (postArray.size() <= chunk_size) {
      return { data = ?postArray; status = true; error = null };
    };
    let pages : [[Types.PostInfo]] = paginate<Types.PostInfo>(postArray, chunk_size);
    if (pages.size() < pageNo) {
      return { data = null; status = true; error = ?notFound.noPageExist };
    };
    return { data = ?pages[pageNo]; status = true; error = ?notFound.noPost }

  };

  public query func postFilter(filterOptions : Types.FilterOptions, pageNo : Nat, chunk_size : Nat, boardName : Types.BoardName) : async Types.Result_1<[Types.PostInfo]> {

    let allPosts : [(Types.BoardName, [Types.PostId])] = Trie.toArray<Types.BoardName, Types.BoardInfo, (Types.BoardName, [Types.PostId])>(boardTrieMap, func(k, v) = (k, v.postIds));

    let postMap = TrieMap.fromEntries<Types.BoardName, [Types.PostId]>(allPosts.vals(), Text.equal, Text.hash);

    let postIds : [Types.PostId] = switch (postMap.get(boardName)) {
      case (null) {
        return { data = null; status = false; error = ?notFound.noBoardExist };
      };
      case (?r) { r };
    };
    var postList = List.nil<Types.PostInfo>();
    for (i in postIds.vals()) {
      switch (Trie.get(postTrieMap, textKey i, Text.equal)) {
        case (?r) { postList := List.push(r, postList) };
        case (null) {
          return { data = null; status = false; error = ?notFound.noPost };
        };
      };
    };
    let postArray = List.toArray(postList);
    if (postArray.size() <= chunk_size) {
      return { data = ?postArray; status = false; error = null };
    };
    let sortedData : [var Types.PostInfo] = bubbleSortPost(Array.thaw<Types.PostInfo>(postArray), filterOptions);
    let paginatedPostInfo : [[Types.PostInfo]] = paginate<Types.PostInfo>(Array.freeze<Types.PostInfo>(sortedData), chunk_size);
    if (paginatedPostInfo.size() < pageNo) {
      return { data = null; status = false; error = ?notFound.noPageExist };
    };
    let page = paginatedPostInfo[pageNo];
    return { data = ?page; status = true; error = null };
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

  let ledger = actor (tokenCanisterId) : Token.Token;

  public func burnToken(amount : Nat) : async Token.Result_2 {
    await ledger.icrc1_transfer({
      to = {
        owner = Principal.fromText("m4etk-jcqiv-42f7u-xv6f4-to4ar-fgwuc-su6zz-jqcon-tk3vb-7ghim-aqe");
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

  public shared ({ caller = userId }) func icrc2_transferFrom(transferto : Principal, amount : Nat) : async Token.Result_2 {
    await ledger.icrc2_transfer_from({
      spender_subaccount = null;
      from = { owner = userId; subaccount = null };
      to = { owner = transferto; subaccount = null };
      amount;
      fee = null;
      memo = null;
      created_at_time = null;
    });
  };

  public query func getPostsByBoard() : async Types.Result_1<[Types.PostInfo]> {
    let userId : Principal = Principal.fromText("bkyz2-fmaaa-aaaaa-qaaaq-cai");
    // let postDataAll = Trie.toArray<Text, Types.PostInfo, { <Types.PostInfo> }>(postTrieMap, func(k, v) = v);
    let postDataAll = Trie.toArray<Text, Types.PostInfo, Types.PostInfo>(postTrieMap, func(k, v) = v);

    if (Array.size(postDataAll) == 0) {
      return { data = null; status = false; error = ?notFound.noData };
    };
    return { data = ?postDataAll; status = true; error = null };
  };

  //  function for the testing
  public func clearData() {
    userTrieMap := Trie.empty<Types.UserId, Types.UserInfo>();
    boardTrieMap := Trie.empty<Types.BoardName, Types.BoardInfo>();
    postTrieMap := Trie.empty<Types.PostId, Types.PostInfo>();
  };

};
