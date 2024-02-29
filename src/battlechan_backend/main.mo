import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Iter "mo:base/Iter";
import Principal "mo:base/Principal";
import Debug "mo:base/Debug";
import Error "mo:base/Error";
import Result "mo:base/Result";

import Types "utils/types";
import { createUserInfo } "controllers/userController";
import { successMessage } "utils/message";
actor {
  private var userMap = HashMap.HashMap<Types.UserId, Types.UserInfo>(0, Principal.equal, Principal.hash);
  private stable var userMapEntries : [(Types.UserId, Types.UserInfo)] = [];

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

  system func preupgrade() {
    userMapEntries := Iter.toArray(userMap.entries());
  };
  system func postupgrade() {
    userMap := HashMap.fromIter(userMapEntries.vals(), userMapEntries.size(), Principal.equal, Principal.hash);
    userMapEntries := [];
  };
};
