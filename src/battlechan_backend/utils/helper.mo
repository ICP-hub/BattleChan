import Hash "mo:base/Hash";
import Int "mo:base/Int";
import Text "mo:base/Text";
import { now } "mo:base/Time";
import Nat32 "mo:base/Nat32";
import { hash } "mo:base/Text";

import Trie "mo:base/Trie";

module {
    type Key<K> = Trie.Key<K>;
    public func key(t : Text) : Key<Text> {
        { hash = hash t; key = t };
    };
    public func getUniqueId() : Hash.Hash {
        let time = Int.toText(now());
        hash(time);
    };
    public func toBoardId(boardName : Text) : Text {
        Text.toLowercase(Text.replace(boardName, #char ' ', "_"));
    };
};
