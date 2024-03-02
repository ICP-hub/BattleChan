import Principal "mo:base/Principal";
import Debug "mo:base/Debug";
import Text "mo:base/Text";
import Error "mo:base/Error";
import HashMap "mo:base/HashMap";
import Trie "mo:base/Trie";
import Hash "mo:base/Hash";
import { reject } "message";
import { key } "helper";
import Types "types";
module {
    public func anonymousCheck(caller : Principal) : Bool {
        if (Principal.isAnonymous(caller) == true) {
            return true;
        };
        false;
    };
    public func checkText(text : Text, value : Nat) : Bool {
        if (Text.size(text) >= value or Text.size(text) == 0) {
            return false;
        };
        true;
    };
};
