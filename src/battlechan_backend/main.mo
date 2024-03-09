import Text "mo:base/Text";
import Principal "mo:base/Principal";
import Error "mo:base/Error";
import Nat32 "mo:base/Nat32";
import Trie "mo:base/Trie";

import Types "utils/types";
import { createBoardInfo } "controllers/boardController";
import { createUserInfo } "controllers/userController";
import { createThreadInfo } "controllers/postController";
import { getUniqueId } "utils/helper";
import { principalKey; textKey } "keys";

import { successMessage } "utils/message";

actor {

  private stable var userTrieMap = Trie.empty<Types.UserId, Types.UserInfo>();
  private stable var boardTrieMap = Trie.empty<Types.BoardName, Types.BoardInfo>();

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
  public shared ({ caller = userId }) func createThread(boardName : Text, postData : Types.PostReq) : async Types.Result {
    try {
      let boardId = Text.toLowercase(Text.replace(boardName, #char ' ', "_"));
      let { updatedBoardInfo; updatedUserInfo } = createThreadInfo(boardId, userId, postData, userTrieMap, boardTrieMap);
      boardTrieMap := Trie.put(boardTrieMap, textKey boardId, Text.equal, updatedBoardInfo).0;
      userTrieMap := Trie.put(userTrieMap, principalKey userId, Principal.equal, updatedUserInfo).0;
      #ok(successMessage.insert);
    } catch (e) {
      let code = Error.code(e);
      let message = Error.message(e);
      #err(code, message);
    };
  };


  
  // public shared query ({ caller = userId }) func createPost(postReq : Types.PostReq) : async Types.Result {
  //   try {
  //     let postId : Types.PostId = Nat32.toText(getUniqueId());
  //     let { postInfo; updatedUserInfo } = createPostInfo(userId, postId, postReq, userTrieMap);
  //     userTrieMap := Trie.put(userTrieMap, principalKey userId, Principal.equal, updatedUserInfo).0;
  //     postTrieMap := Trie.put(postTrieMap, textKey postId, Text.equal, postInfo).0;
  //     #ok(successMessage.insert);

  //   } catch (e) {
  //     let code = Error.code(e);
  //     let message = Error.message(e);
  //     #err(code, message);
  //   };
  // };

};
