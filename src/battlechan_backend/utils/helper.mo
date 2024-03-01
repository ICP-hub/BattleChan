import Hash "mo:base/Hash";
import Int "mo:base/Int";
import { now } "mo:base/Time";
import Nat32 "mo:base/Nat32";
import { hash } "mo:base/Text";

module {
    public func getUniqueId() : Hash.Hash {
        let time = Int.toText(now());
        hash(time);
    };
};
