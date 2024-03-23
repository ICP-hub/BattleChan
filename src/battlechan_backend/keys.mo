import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Types "utils/types";

module {
    public func principalKey(t : Principal) : Types.Key<Principal> {
        { hash = Principal.hash t; key = t };
    };
    public func textKey(t : Text) : Types.Key<Text> {
        { hash = Text.hash t; key = t };
    };
};
