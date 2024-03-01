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

import Types "utils/types";
import { createUserInfo } "controllers/userController";
import { createPostInfo } "controllers/postController";
import { getUniqueId } "utils/helper";

import { successMessage } "utils/message";
actor {
  private var userMap = HashMap.HashMap<Types.UserId, Types.UserInfo>(0, Principal.equal, Principal.hash);
  private var postMap = HashMap.HashMap<Types.PostId, Types.PostInfo>(0, Text.equal, Text.hash);

  private stable var userMapEntries : [(Types.UserId, Types.UserInfo)] = [];
  private stable var postMapEntries : [(Types.PostId, Types.PostInfo)] = [];

  public shared ({ caller = userId }) func createUserAccount(userReq : Types.UserReq) : async Types.Result {
    try {
      let userInfo : Types.UserInfo = createUserInfo(userId, userReq, userMap);
      userMap.put(userId, userInfo);
      #ok(successMessage.insert);

    } catch (e) {
      let code = Error.code(e);
      let message = Error.message(e);
      #err(code, message);
    };
  };

  public shared query ({ caller = userId }) func getUserInfo() : async Types.Result_1<Types.UserInfo> {
    switch (userMap.get(userId)) {
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
      let postInfo : Types.PostInfo = createPostInfo(userId, postId, postReq, userMap);

      postMap.put(postId, postInfo);
      #ok(successMessage.insert);

    } catch (e) {
      let code = Error.code(e);
      let message = Error.message(e);
      #err(code, message);
    };
  };

  system func preupgrade() {
    userMapEntries := Iter.toArray(userMap.entries());

  };
  system func postupgrade() {
    userMap := HashMap.fromIter(userMapEntries.vals(), userMapEntries.size(), Principal.equal, Principal.hash);
    postMap := HashMap.fromIter(postMapEntries.vals(), postMapEntries.size(), Text.equal, Text.hash);
    userMapEntries := [];
    postMapEntries := [];
  };
};
