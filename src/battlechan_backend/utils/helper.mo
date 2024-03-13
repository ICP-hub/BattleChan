import Hash "mo:base/Hash";
import Int "mo:base/Int";
import Text "mo:base/Text";
import { now } "mo:base/Time";
import Nat32 "mo:base/Nat32";
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
        let postId = arr[1];
        return postId;
    };
};
