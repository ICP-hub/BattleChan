import Hash "mo:base/Hash";
import Int "mo:base/Int";
import Text "mo:base/Text";
import { now } "mo:base/Time";
import Nat32 "mo:base/Nat32";
import Array "mo:base/Array";
import { hash } "mo:base/Text";

import Trie "mo:base/Trie";
import Iter "mo:base/Iter";
import Types "types";

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
    public func getPostIdFromCommentId(commentId : Types.CommentId) : Types.PostId {
        let arr = Iter.toArray(Text.split(commentId, #char '_'));
        let postId = arr[0];
        return postId;
    };
    public func getPostId(id : Text) : Types.PostId {
        let arr = Iter.toArray(Text.split(id, #char '-'));
        let postId = arr[1];
        return postId;
    };
    public func checkVote<V>(arr : [V], value : V) : Bool {
        switch (Array.find<V>(arr, func(x : V) : Bool { x == value })) {
            case (?data) { return true };
            case (null) { return false };
        };
    };
};
