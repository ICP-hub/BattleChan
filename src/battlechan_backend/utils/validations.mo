import Principal "mo:base/Principal";
import Debug "mo:base/Debug";
import Text "mo:base/Text";
import Error "mo:base/Error";
import { reject } "message";
import Types "types";
module {
    public func anonymousCheck(caller : Principal) {
        if (Principal.isAnonymous(caller) == true) {
            Debug.trap(reject.anonymous);
        };
    };

    public func checkText(text : Text, value : Nat) : Bool {
        if (Text.size(text) >= value or Text.size(text) == 0) {
            return false;
        };
        true;
    };
};
