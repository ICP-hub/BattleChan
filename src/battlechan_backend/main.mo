import Text "mo:base/Text";
import Principal "mo:base/Principal";
import Error "mo:base/Error";
import Nat32 "mo:base/Nat32";
import Trie "mo:base/Trie";
import List "mo:base/List";
import Array "mo:base/Array";
import Debug "mo:base/Debug";
import Nat "mo:base/Nat";
import Char "mo:base/Char";
import TrieMap "mo:base/TrieMap";
import Int "mo:base/Int";
import Option "mo:base/Option";
import Iter "mo:base/Iter";
import Cycles "mo:base/ExperimentalCycles";

import Types "utils/types";
import { anonymousCheck } "./utils/validations";

import Search "./controllers/search";
import { createBoardInfo } "controllers/board";
import { createUserInfo; updateUserInfo } "controllers/user";
import { createCommentInfo; updateLikedComments } "controllers/comment";
import {
  createPostInfo;
  postArchive;
  updateVoteStatus;
  bubbleSortPost;
  // updatePostExpireTime;
  createTrieMapOfArchivedPost;
  withdraw;
  claim;
} "controllers/post";
import { createReply; updateLikesInReplies } "controllers/reply";
import { getUniqueId; toBoardId; getPostIdFromCommentId; getPostId; paginate } "utils/helper";
import { principalKey; textKey } "keys";

import Token "./token/token";
import { successMessage; notFound } "utils/message";

actor BattleChan {

  private stable var userTrieMap = Trie.empty<Types.UserId, Types.UserInfo>();
  private stable var boardTrieMap = Trie.empty<Types.BoardName, Types.BoardInfo>();
  private stable var postTrieMap = Trie.empty<Types.PostId, Types.PostInfo>();
  private stable var withdrawPostTrie = Trie.empty<Types.PostId, List.List<Types.WithdrawRecord>>();
  private stable var userAchivedPostTrie = Trie.empty<Types.UserId, List.List<(Types.PostId, Types.PostInfo)>>();

  private stable let freePostTime = 5;
  private stable let voteTime = 1;
  let decimal = 100000000;
  let transactionFee = 100;
  stable var postNameRootNode : Search.Node = Search.createNode();

  // private let paymentCanisterId = Principal.fromText("be2us-64aaa-aaaaa-qaabq-cai");

  let tokenCanisterId = "weoa5-5qaaa-aaaan-qmctq-cai";
  let backendCanisterId = Principal.fromText("jeupf-yyaaa-aaaan-ql7iq-cai");
  let ledger = actor (tokenCanisterId) : Token.Token;

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

  public shared ({ caller = userId }) func updatedUserAccount(userReq : Types.UserReq) : async Types.Result {
    try {
      let userInfo : Types.UserInfo = updateUserInfo(userId, userReq, userTrieMap);
      userTrieMap := Trie.put(userTrieMap, principalKey userId, Principal.equal, userInfo).0;
      #ok(successMessage.update);
    } catch (e) {
      let code = Error.code(e);
      let message = Error.message(e);
      #err(code, message);
    };
  };

  public func createNewBoard(boardName : Text, boardDes : Text) : async Types.Result {
    try {
      let newBoard : Types.BoardInfo = createBoardInfo(boardName, boardDes);
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
      let boardId = Text.toLowercase(Text.replace(boardName, #char ' ', "_"));
      let postId : Types.PostId = "#" # Nat32.toText(getUniqueId());
      insertNameNode(postData.postName, postId);
      let { updatedBoardInfo; updatedUserInfo; newPost } = createPostInfo(boardId, freePostTime, postId, userId, postData, userTrieMap, boardTrieMap);

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

  // public shared ({ caller = userId }) func updatePostVisiblity(timeToken : Nat, postId : Types.PostId) : async Token.Result_2 {
  //   postTrieMap := updatePostExpireTime(userId, timeToken, postId, postTrieMap);
  //   await icrc2_transferFrom(userId, backendCanisterId, timeToken * decimal);
  // };

  public shared ({ caller = userId }) func upvoteOrDownvotePost(postId : Types.PostId, voteStatus : Types.VoteStatus) : async Types.Result {
    try {
      let { updatedUserInfo; updatedPostInfo } = await updateVoteStatus(userId, voteTime, voteStatus, postId, postTrieMap, userTrieMap);

      switch (voteStatus) {
        case (#upvote) {
          let paymentStatus = await ledger.icrc2_transfer_from({
            spender_subaccount = null;
            from = { owner = userId; subaccount = null };
            to = { owner = backendCanisterId; subaccount = null };
            amount = voteTime * decimal;
            fee = ?transactionFee;
            memo = null;
            created_at_time = null;
          });
          switch (paymentStatus) {
            case (#Ok(index)) {};
            case (#Err(userId)) {
              throw Error.reject(debug_show (userId));
            };
          };
        };
        case (#downvote) {};
      };
      userTrieMap := Trie.put(userTrieMap, principalKey userId, Principal.equal, updatedUserInfo).0;
      postTrieMap := Trie.put(postTrieMap, textKey postId, Text.equal, updatedPostInfo).0;
      #ok(successMessage.update);
    } catch (e) {
      let code = Error.code(e);
      let message = Error.message(e);
      #err(code, message);
    };
  };

  public shared ({ caller = userId }) func withdrawPost(postId : Types.PostId, amount : Int) : async Types.Result {
    try {
      let { updatedPostTrie; updatedWithDrawPostTrie; ownerReward } = withdraw(postId, amount, userId, postTrieMap, withdrawPostTrie);
      postTrieMap := updatedPostTrie;
      withdrawPostTrie := updatedWithDrawPostTrie;
      let paymentRes = await ledger.icrc1_transfer({
        to = {
          owner = userId;
          subaccount = null;
        };
        fee = null;
        memo = null;
        from_subaccount = null;
        created_at_time = null;
        amount = ownerReward;
      });
      switch (paymentRes) {
        case (#Ok(index)) {};
        case (#Err(userId)) {
          throw Error.reject("Internal Error!");
        };
      };
      // paymentRes;
      #ok(successMessage.insert);
    } catch (e) {
      let code = Error.code(e);
      let message = Error.message(e);
      #err(code, message);
    };
  };

  public shared ({ caller = userId }) func claimReward(index : Nat, postId : Types.PostId) : async Types.Result {
    try {
      let { updatedWithDrawPostTrie; amount } = claim(index, userId, postId, userTrieMap, withdrawPostTrie);
      let paymentRes = await ledger.icrc1_transfer({
        to = {
          owner = userId;
          subaccount = null;
        };
        fee = null;
        memo = null;
        from_subaccount = null;
        created_at_time = null;
        amount;
      });
      switch (paymentRes) {
        case (#Ok(index)) {};
        case (#Err(userId)) {
          throw Error.reject("Internal Error!");
        };
      };
      withdrawPostTrie := updatedWithDrawPostTrie;

      #ok(successMessage.update);
    } catch (e) {
      let code = Error.code(e);
      let message = Error.message(e);
      #err(code, message);
    };
  };

  public func archivePost(postId : Types.PostId) : async Types.Result {
    try {
      let {
        updatedUserTrie;
        updatedPostTrie;
        updatedArchivedTrie;
        updateBoardTrie;
      } = postArchive(postId, boardTrieMap, userTrieMap, postTrieMap, userAchivedPostTrie);
      userTrieMap := updatedUserTrie;
      postTrieMap := updatedPostTrie;
      userAchivedPostTrie := updatedArchivedTrie;
      boardTrieMap := updateBoardTrie;
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

  public shared ({ caller = userId }) func likeComment(postId : Types.PostId, voteStatus : Types.VoteStatus, commentId : Types.CommentId) : async Types.Result {
    try {
      let { updatedUserInfo; updatedPostInfo } = updateLikedComments(userId, postId, voteStatus, commentId, userTrieMap, postTrieMap);

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

  public shared ({ caller = userId }) func likeCommentReply(commentId : Types.CommentId, voteStatus : Types.VoteStatus, replyId : Types.ReplyId) : async Types.Result {
    try {
      let postId = getPostIdFromCommentId(commentId);
      let postInfo : Types.PostInfo = updateLikesInReplies(userId, commentId, replyId, voteStatus, postTrieMap, userTrieMap);

      postTrieMap := Trie.put(postTrieMap, textKey postId, Text.equal, postInfo).0;

      #ok(successMessage.update);
    } catch (e) {

      let code = Error.code(e);
      let message = Error.message(e);
      #err(code, message);
    };
  };

  public shared query ({ caller = userId }) func getUserInfo() : async Types.Result_1<Types.UserInfo> {
    // Debug.print(debug_show (userId));
    if (anonymousCheck(userId) == true) {
      return { data = null; status = false; error = ?"Error! No user Exist" };

    };

    switch (Trie.get(userTrieMap, principalKey userId, Principal.equal)) {
      case (null) {
        // Debug.print("Error! No user Exist");
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

  public query func searchPost(postName : Text) : async {
    activePost : [Types.PostSearch];
    archivedPost : [Types.PostSearch];
  } {
    var node = postNameRootNode;
    let { updatedResult; updatedNode } = Search.searchHelper(postName, node);
    var result = updatedResult;

    node := updatedNode;
    result := Search.collectUsers(node, updatedResult);

    let archivedPostArray = createTrieMapOfArchivedPost(userAchivedPostTrie);
    let userArchivedPostsMap = TrieMap.fromEntries<Types.PostId, Types.PostInfo>(archivedPostArray.vals(), Text.equal, Text.hash);

    var activePostList = List.nil<Types.PostSearch>();
    var archivedPostList = List.nil<Types.PostSearch>();

    for (i in result.vals()) {
      switch (Trie.get(postTrieMap, textKey i, Text.equal)) {
        case (?r) {
          let postRes : Types.PostSearch = {
            postId = r.postId;
            postName = r.postName;

          };
          activePostList := List.push(postRes, activePostList);
        };
        case (null) {
          switch (userArchivedPostsMap.get(i)) {

            case (?value) {
              let archivedPostRes : Types.PostSearch = {
                postId = value.postId;
                postName = value.postName;
              };
              archivedPostList := List.push(archivedPostRes, archivedPostList);
            };
            case (null) {};
          };
        };
      };
    };
    return {
      activePost = List.toArray(activePostList);
      archivedPost = List.toArray(archivedPostList);
    };
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

  public query func getSingleArchivedPost(postId : Types.PostId) : async Types.Result_1<Types.PostInfo> {
    let archivedPosts = createTrieMapOfArchivedPost(userAchivedPostTrie);
    let userArchivedPostsMap = TrieMap.fromEntries<Types.PostId, Types.PostInfo>(archivedPosts.vals(), Text.equal, Text.hash);

    switch (userArchivedPostsMap.get(postId)) {
      case (null) {
        return { data = null; status = false; error = ?notFound.noPost };
      };
      case (?v) { return { data = ?v; status = true; error = null } };
    };
  };

  public shared query ({ caller = userId }) func getArchivedPostOfUser(chunk_size : Nat, pageNo : Nat) : async Types.Result_1<[(Types.PostId, Types.PostInfo)]> {
    let postArray : [(Types.PostId, Types.PostInfo)] = switch (Trie.get(userAchivedPostTrie, principalKey userId, Principal.equal)) {
      case (null) {
        return { data = null; status = true; error = ?notFound.noArchivedPost };
      };
      case (?result) { List.toArray(result) };
    };
    if (postArray.size() == 0) {
      return { data = null; status = true; error = ?notFound.noArchivedPost };
    };
    if (postArray.size() <= chunk_size) {
      return { data = ?postArray; status = true; error = null };
    };
    let pages : [[(Types.PostId, Types.PostInfo)]] = paginate<(Types.PostId, Types.PostInfo)>(postArray, chunk_size);

    if (pages.size() < pageNo) {
      return { data = null; status = true; error = ?notFound.noPageExist };
    };
    return { data = ?pages[pageNo]; status = true; error = null }

  };

  public shared query ({ caller = userId }) func getAllCommentOfArchivedPost(postId : Types.PostId, chunk_size : Nat, pageNo : Nat) : async Types.Result_1<[Types.CommentInfo]> {
    let postArray : [(Types.PostId, Types.PostInfo)] = switch (Trie.get(userAchivedPostTrie, principalKey userId, Principal.equal)) {
      case (null) {
        return { data = null; status = true; error = ?notFound.noArchivedPost };
      };
      case (?result) { List.toArray(result) };
    };
    let archivedPostTrieMap = TrieMap.fromEntries<Types.PostId, Types.PostInfo>(postArray.vals(), Text.equal, Text.hash);
    let postInfo : Types.PostInfo = switch (archivedPostTrieMap.get(postId)) {
      case (null) {
        return { data = null; status = true; error = ?notFound.noPost };
      };
      case (?r) { r };
    };
    let commentData : [Types.CommentInfo] = Trie.toArray<Types.CommentId, Types.CommentInfo, Types.CommentInfo>(postInfo.comments, func(k, v) = v);
    if (commentData.size() < chunk_size) {
      return { data = ?commentData; status = true; error = null };
    };
    let paginatedCommentInfo : [[Types.CommentInfo]] = paginate<Types.CommentInfo>(commentData, chunk_size);
    if (paginatedCommentInfo.size() < pageNo) {
      return { data = null; status = true; error = ?notFound.noPageExist };
    };
    return { data = ?paginatedCommentInfo[pageNo]; status = true; error = null };
  };

  public query func archivePostFilter(filterOptions : Types.FilterOptions, pageNo : Nat, chunk_size : Nat, boardName : Types.BoardName) : async Types.Result_1<[Types.PostRes]> {

    let archivedPostsList = Trie.toArray<Types.UserId, List.List<(Types.PostId, Types.PostInfo)>, List.List<(Types.PostId, Types.PostInfo)>>(userAchivedPostTrie, func(k, v) = v);
    var archivedPost = List.nil<(Types.PostId, Types.PostInfo)>();
    for (list in archivedPostsList.vals()) {
      archivedPost := List.append<(Types.PostId, Types.PostInfo)>(archivedPost, list);
    };

    var listPost = List.nil<Types.PostInfo>();

    for (post in List.toArray(archivedPost).vals()) {
      if (post.1.board == boardName) {
        listPost := List.push(post.1, listPost);
      };
    };

    let sortedData : [var Types.PostRes] = bubbleSortPost(Array.thaw<Types.PostRes>(List.toArray(listPost)), filterOptions);
    let reverseData : [Types.PostRes] = Array.reverse<Types.PostRes>(Array.freeze<Types.PostRes>(sortedData));
    let paginatedPostInfo : [[Types.PostRes]] = paginate<Types.PostRes>(reverseData, chunk_size);

    if (paginatedPostInfo.size() < pageNo or pageNo < 1) {
      return { data = null; status = false; error = ?notFound.noPageExist };
    };

    let page = paginatedPostInfo[pageNo - 1];
    return { data = ?page; status = true; error = null };

  };

  public query func postFilter(filterOptions : Types.FilterOptions, pageNo : Nat, chunk_size : Nat, boardName : Types.BoardName) : async Types.Result_1<[Types.PostRes]> {

    let boardId = toBoardId(boardName);
    let allPosts : [(Types.BoardName, [Types.PostId])] = Trie.toArray<Types.BoardName, Types.BoardInfo, (Types.BoardName, [Types.PostId])>(boardTrieMap, func(k, v) = (k, v.postIds));

    let postMap = TrieMap.fromEntries<Types.BoardName, [Types.PostId]>(allPosts.vals(), Text.equal, Text.hash);

    let postIds : [Types.PostId] = switch (postMap.get(boardId)) {
      case (null) {
        return { data = null; status = false; error = ?notFound.noBoardExist };
      };
      case (?r) { r };
    };

    var postList = List.nil<Types.PostRes>();
    for (i in postIds.vals()) {
      switch (Trie.get(postTrieMap, textKey i, Text.equal)) {
        case (?r) {
          let postRes : Types.PostRes = {
            postId = r.postId;
            postName = r.postName;
            postDes = r.postDes;
            board = r.board;
            upvotedBy = r.upvotedBy;
            downvotedBy = r.downvotedBy;
            upvotes = r.upvotes;
            downvotes = r.downvotes;
            postMetaData = r.postMetaData;
            createdBy = r.createdBy;
            createdAt = r.createdAt;
            expireAt = r.expireAt;
            updatedAt = r.updatedAt;
          };
          postList := List.push(postRes, postList);
        };
        case (null) {
          return { data = null; status = false; error = ?notFound.noPost };
        };
      };
    };

    let postArray = List.toArray(postList);
    if (postArray.size() <= chunk_size) {
      return { data = ?postArray; status = true; error = null };
    };
    let sortedData : [var Types.PostRes] = bubbleSortPost(Array.thaw<Types.PostRes>(postArray), filterOptions);
    let reverseData : [Types.PostRes] = Array.reverse<Types.PostRes>(Array.freeze<Types.PostRes>(sortedData));

    let paginatedPostInfo : [[Types.PostRes]] = paginate<Types.PostRes>(reverseData, chunk_size);

    if (paginatedPostInfo.size() < pageNo or pageNo < 1) {
      return { data = null; status = false; error = ?notFound.noPageExist };
    };

    let page = paginatedPostInfo[pageNo -1];
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
  public shared query ({ caller = userId }) func votesOfUser() : async Types.Result_1<{ active : { upvotes : [Types.PostId]; downvotes : [Types.PostId] }; archived : { upvotes : [Types.PostId]; downvotes : [Types.PostId] } }> {

    let userInfo : Types.UserInfo = switch (Trie.get(userTrieMap, principalKey userId, Principal.equal)) {
      case (?value) { value };
      case (null) {
        return { data = null; status = false; error = ?notFound.noUser };
      };
    };
    var activeUpvotes = List.nil<Types.PostId>();
    var activeDownvotes = List.nil<Types.PostId>();

    var archivedUpvotes = List.nil<Types.PostId>();
    var archivedDownvotes = List.nil<Types.PostId>();
    for (item in userInfo.upvotedTo.vals()) {
      switch (Trie.get(postTrieMap, textKey item, Text.equal)) {
        case (null) { archivedUpvotes := List.push(item, archivedUpvotes) };
        case (?value) {
          activeUpvotes := List.push(item, activeUpvotes);
        };
      };
    };
    for (item in userInfo.downvotedTo.vals()) {
      switch (Trie.get(postTrieMap, textKey item, Text.equal)) {
        case (null) { archivedDownvotes := List.push(item, archivedDownvotes) };
        case (?value) {
          activeDownvotes := List.push(item, activeDownvotes);
        };
      };
    };
    let userVotesData = {
      active = {
        upvotes = List.toArray(activeUpvotes);
        downvotes = List.toArray(activeDownvotes);
      };
      archived = {
        upvotes = List.toArray(archivedUpvotes);
        downvotes = List.toArray(archivedDownvotes);
      };
    };
    return { data = ?userVotesData; status = false; error = ?notFound.noUser };
  };

  public shared ({ caller = userId }) func getAllCommentOfUser() : async Types.Result_1<{ active : [(Types.CommentId, Types.CommentInfo)]; archived : [(Types.CommentId, Types.CommentInfo)] }> {
    let userInfo : Types.UserInfo = switch (Trie.get(userTrieMap, principalKey userId, Principal.equal)) {
      case (?value) { value };
      case (null) {
        return { data = null; status = false; error = ?notFound.noUser };
      };
    };
    var activeComment = List.nil<(Types.CommentId, Types.CommentInfo)>();
    var archivedComment = List.nil<(Types.CommentId, Types.CommentInfo)>();

    let archivedPost = createTrieMapOfArchivedPost(userAchivedPostTrie);
    let userArchivedPostsMap = TrieMap.fromEntries<Types.PostId, Types.PostInfo>(archivedPost.vals(), Text.equal, Text.hash);

    for (item in userInfo.createdComments.vals()) {
      let postId = getPostIdFromCommentId(item);
      switch (Trie.get(postTrieMap, textKey postId, Text.equal)) {
        case (null) {

          let postId = getPostIdFromCommentId(item);
          switch (userArchivedPostsMap.get(postId)) {
            case (null) {};
            case (?post) {
              switch (Trie.get(post.comments, textKey item, Text.equal)) {
                case (null) {};
                case (?comment) {
                  archivedComment := List.push((item, comment), archivedComment);
                };
              };
            };
          };

        };
        case (?value) {

          switch (Trie.get(value.comments, textKey item, Text.equal)) {
            case (?result) {
              activeComment := List.push((item, result), activeComment);
            };
            case (null) {};

          };
        };
      };
    };

    return {
      data = ?{
        active = List.toArray(activeComment);
        archived = List.toArray(archivedComment);
      };
      status = false;
      error = null;
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

    if (allData.size() == 0) {
      return { data = null; status = true; error = ?notFound.noArchivedPost };
    };
    if (allData.size() <= chunk_size) {
      return { data = ?allData; status = true; error = null };
    };

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
    if (allData.size() <= chunk_size) {
      return { data = ?allData; status = true; error = null };
    };
    let page = paginate<Types.ReplyInfo>(allData, chunk_size);
    if (page.size() < pageNo) {
      return { data = null; status = false; error = ?notFound.noPageExist };
    };
    return { data = ?allData; status = true; error = null };
  };

  public query func getBoardData(boardName : Types.BoardName) : async ?Types.BoardInfo {
    Trie.get(boardTrieMap, textKey boardName, Text.equal);
  };
  public shared query ({ caller = userId }) func listCommentersReward() : async Types.Result_1<[Types.CommentRewards]> {
    let userInfo : Types.UserInfo = switch (Trie.get(userTrieMap, principalKey userId, Principal.equal)) {
      case (?value) { value };
      case (null) {
        return { data = null; status = false; error = ?notFound.noUser };
      };
    };
    let userCommentData : [Types.CommentId] = userInfo.likedComments;
    var userCommentOnPost : List.List<Types.WithdrawRecord> = List.nil<Types.WithdrawRecord>();
    var userRewardedComments : List.List<Types.CommentRewards> = List.nil<Types.CommentRewards>();
    for (item in userCommentData.vals()) {
      let postId : Types.PostId = getPostIdFromCommentId(item);
      switch (Trie.get(withdrawPostTrie, textKey postId, Text.equal)) {
        case (null) {};
        case (?r) {
          userCommentOnPost := List.append<Types.WithdrawRecord>(r, userCommentOnPost);
        };
      };
    };
    if (List.size<Types.WithdrawRecord>(userCommentOnPost) == 0) {
      return { data = null; status = false; error = ?notFound.noData };
    };
    for (item in List.toArray(userCommentOnPost).vals()) {
      switch (Trie.get(item.commentersReward, principalKey userId, Principal.equal)) {
        case (null) {};
        case (?r) { userRewardedComments := List.push(r, userRewardedComments) };
      };
    };
    if (List.size<Types.CommentRewards>(userRewardedComments) == 0) {
      return { data = null; status = false; error = ?notFound.noData };
    };
    return {
      data = ?List.toArray(userRewardedComments);
      status = true;
      error = null;
    };

  };
  public query func getTotalPostInBoard() : async Types.Result_1<[{ boardName : Text; size : Nat; updatedAt : ?Text }]> {
    let boardPostData = Trie.toArray<Text, Types.BoardInfo, { boardName : Text; size : Nat; updatedAt : ?Text }>(boardTrieMap, func(k, v) = { boardName = v.boardName; size = v.totalPosts; updatedAt = v.updatedAt });
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

  public query func getTotalCounts() : async Types.Result_1<{ userData : Nat; postData : Nat; userAchivedPostData : Nat; withdrawPost : Nat }> {
    let totalData = {
      userData = Trie.size(userTrieMap);
      postData = Trie.size(postTrieMap);
      userAchivedPostData = Trie.size(userAchivedPostTrie);
      withdrawPost = Trie.size(withdrawPostTrie);
    };
    return {
      data = ?totalData;
      status = true;
      error = null;
    };
  };

  public shared query ({ caller = userId }) func getUserTotalCounts() : async Types.Result_1<{ postData : Nat; comments : Nat; userArchivedPost : Nat; likedPost : Nat; dislikedPost : Nat }> {
    let userInfo = switch (Trie.get(userTrieMap, principalKey userId, Principal.equal)) {
      case (?value) { value };
      case (null) {
        return { data = null; status = false; error = ?notFound.noUser };
      };
    };
    let userArchivedInfo : Nat = switch (Trie.get(userAchivedPostTrie, principalKey userId, Principal.equal)) {
      case (?value) { List.size(value) };
      case (null) { 0 };
    };

    let userData = {
      postData = userInfo.postIds.size();
      comments = userInfo.createdComments.size();
      userArchivedPost = userArchivedInfo;
      likedPost = userInfo.upvotedTo.size();
      dislikedPost = userInfo.downvotedTo.size();
    };
    return {
      data = ?userData;
      status = true;
      error = null;
    };

  };
  public query func getRecentPost() : async [Types.PostInfo] {
    let postDataAll = Trie.toArray<Text, Types.PostInfo, Types.PostInfo>(postTrieMap, func(k, v) = v);
    var recentPostList = List.nil<Types.PostInfo>();

    if (postDataAll.size() > 10) {
      for (i in Iter.range(0, 10 - 1)) {
        recentPostList := List.push(postDataAll[i], recentPostList);
      };
      return List.toArray(recentPostList);
    };
    return postDataAll;
  };

  public query func getTotalCommentsInPost(postId : Types.PostId) : async Types.Result_1<Nat> {
    let postInfo = switch (Trie.get(postTrieMap, textKey postId, Text.equal)) {
      case (?value) { value };
      case (null) {
        return {
          data = null;
          status = false;
          error = ?notFound.noPost;
        };
      };
    };
    return {
      data = ?Trie.size(postInfo.comments);
      status = true;
      error = null;
    };
  };

  // public func burnToken(amount : Nat) : async Token.Result_2 {
  //   await ledger.icrc1_transfer({
  //     to = {
  //       owner = Principal.fromText("m4etk-jcqiv-42f7u-xv6f4-to4ar-fgwuc-su6zz-jqcon-tk3vb-7ghim-aqe");
  //       subaccount = null;
  //     };
  //     fee = null;
  //     memo = null;
  //     from_subaccount = null;
  //     created_at_time = null;
  //     amount;
  //   });
  // };

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

  public func icrc2_transferFrom(transferFrom : Principal, transferto : Principal, amount : Nat) : async Token.Result_2 {
    await ledger.icrc2_transfer_from({
      spender_subaccount = null;
      from = { owner = transferFrom; subaccount = null };
      to = { owner = transferto; subaccount = null };
      amount;
      fee = null;
      memo = null;
      created_at_time = null;
    });
  };

  public query func getAllPosts() : async Types.Result_1<[Types.PostInfo]> {
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
    userAchivedPostTrie := Trie.empty<Types.UserId, List.List<(Types.PostId, Types.PostInfo)>>();
  };

};
