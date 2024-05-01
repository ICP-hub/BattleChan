import Array "mo:base/Array";
import Text "mo:base/Text";
import Trie "mo:base/Trie";
import Iter "mo:base/Iter";
import Char "mo:base/Char";

module {
    public type Node = {
        var children : Trie.Trie<Text, Node>;
        var isEndOfWord : Bool;
        var user : [Text];
    };
    type Key<K> = Trie.Key<K>;
    public func createNode() : Node {
        {
            var children = Trie.empty<Text, Node>();
            var isEndOfWord = false;
            var user = [];
        };
    };
    
    public func textKey(t : Text) : Key<Text> {
        { hash = Text.hash t; key = t };
    };
    public func collectUsers(node : Node, result : [Text]) : [Text] {
        var arrResult = result;
        if (node.isEndOfWord == true) {
            arrResult := Array.append<Text>(node.user, arrResult);
        };
        let allData : [Text] = Trie.toArray<Text, Node, Text>(node.children, func(k, v) = k);

        for (key in Iter.fromArray(allData)) {

            switch (Trie.get(node.children, textKey key, Text.equal)) {
                case (?child) {
                    arrResult := Array.append<Text>(collectUsers(child, result), arrResult);
                };
                case (null) {};
            };
        };
        return arrResult;
    };
    public func searchHelper(postName : Text, node : Node) : {
        updatedResult : [Text];
        updatedNode : Node;
    } {
        var updatedNode : Node = node;
        var updatedResult : [Text] = [];
        for (char in Text.toIter(postName)) {
            let data = Char.toText(char);
            switch (Trie.get(node.children, textKey data, Text.equal)) {
                case (null) { return { updatedResult; updatedNode } };
                case (?childNode) { updatedNode := childNode };
            };
        };
        return { updatedResult; updatedNode };
    };
};
