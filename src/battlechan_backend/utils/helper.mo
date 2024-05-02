import Hash "mo:base/Hash";
import Int "mo:base/Int";
import Text "mo:base/Text";
import { now } "mo:base/Time";
import { hash } "mo:base/Text";

import Trie "mo:base/Trie";
import Iter "mo:base/Iter";
import List "mo:base/List";
import Nat "mo:base/Nat";
import Nat32 "mo:base/Nat32";
import Char "mo:base/Char";
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
    public func textToInt(txt : Text) : Int {
        assert (txt.size() > 0);
        let chars = txt.chars();

        var num : Int = 0;
        for (v in chars) {
            let charToNum = Nat32.toNat(Char.toNat32(v) -48);
            assert (charToNum >= 0 and charToNum <= 9);
            num := num * 10 + charToNum;
        };

        num;
    };
    public func paginate<V>(array : [V], chunkSize : Nat) : [[V]] {

        var paginationArray : List.List<[V]> = List.nil<[V]>();
        var num_chunk : Nat = (array.size() + chunkSize -1) / chunkSize;
        for (i in Iter.range(0, num_chunk -1)) {
            var tempArray = List.nil<V>();
            for (j in Iter.range(0, chunkSize -1)) {
                var index = i * chunkSize + j;
                if (index < array.size()) {
                    tempArray := List.push(array[index], tempArray);
                };
            };
            paginationArray := List.push(List.toArray(tempArray), paginationArray);
        };
        List.toArray(paginationArray);
    };

    public func validText(text : Text, value : Nat) : Bool {
        if (Text.size(text) >= value or Text.size(text) == 0) {
            return false;
        };
        true;
    };
    func secToNanoSec(min : Int) : Int {
        let seconds = min * 60;
       return seconds * 1_000_000_000;
    };
    public func increaseTime(min : Int, expireTime : Int) : Int {
        let increasedTime = secToNanoSec(min) + expireTime;
        return increasedTime;
    };  
    public func decreaseTime(min : Int, expireTime : Int) : Int {
        let decreasedTime = expireTime - secToNanoSec(min);
        return decreasedTime;
    };

};
