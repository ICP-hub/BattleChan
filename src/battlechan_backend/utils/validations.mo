import Principal "mo:base/Principal";
import Text "mo:base/Text";
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
