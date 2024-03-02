import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Iter "mo:base/Iter";
import Principal "mo:base/Principal";
import Debug "mo:base/Debug";
import Error "mo:base/Error";
import Result "mo:base/Result";
import Random "mo:base/Random";
import Hash "mo:base/Hash";
import Nat32 "mo:base/Nat32";
import Trie "mo:base/Trie";

import Types "utils/types";
import { createUserInfo } "controllers/userController";
import { createPostInfo } "controllers/postController";
import { getUniqueId } "utils/helper";
import { principalKey; textKey } "keys";

import { successMessage } "utils/message";
actor {

  private stable var userTrieMap = Trie.empty<Types.UserId, Types.UserInfo>();
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

  public shared query ({ caller = userId }) func createPost(postReq : Types.PostReq) : async Types.Result {
    try {
      let postId : Types.PostId = Nat32.toText(getUniqueId());
      let { postInfo; updatedUserInfo } = createPostInfo(userId, postId, postReq, userTrieMap);
      userTrieMap := Trie.put(userTrieMap, principalKey userId, Principal.equal, updatedUserInfo).0;
      postTrieMap := Trie.put(postTrieMap, textKey postId, Text.equal, postInfo).0;
      #ok(successMessage.insert);

    } catch (e) {
      let code = Error.code(e);
      let message = Error.message(e);
      #err(code, message);
    };
  };

};
