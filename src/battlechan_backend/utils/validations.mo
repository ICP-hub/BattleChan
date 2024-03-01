import Principal "mo:base/Principal";
import Debug "mo:base/Debug";
import Text "mo:base/Text";
import Error "mo:base/Error";
import HashMap "mo:base/HashMap";
import { reject } "message";
import Types "types";
module {
    public func anonymousCheck(caller : Principal) : Bool {
        if (Principal.isAnonymous(caller) == true) {
            return true;
        };
        false;
    };
    public func checkKeyExist<K, V>(key : K, map : HashMap.HashMap<K, V>) : Bool {
        switch (map.get(key)) {
            case (?value) { true };
            case (null) { false };
        };
    };
    public func checkText(text : Text, value : Nat) : Bool {
        if (Text.size(text) >= value or Text.size(text) == 0) {
            return false;
        };
        true;
    };
};
