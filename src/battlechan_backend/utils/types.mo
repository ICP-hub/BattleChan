import Result "mo:base/Result";
import Principal "mo:base/Principal";
import Trie "mo:base/Trie";
import Error "mo:base/Error";

module {
    public type Key<K> = Trie.Key<K>;
    public type UserId = Principal;
    public type UserReq = {
        userName : Text;
        profileImg : Text;
    };
    public type BoardName = Text;

    public type BoardInfo = {
        boardName : Text;
        boardDes : Text;
        posts : Trie.Trie<PostId, PostInfo>;
        createdAt : Text;
        updatedAt : ?Text;
    };

    public type UserInfo = {
        userId : UserId;
        userName : Text;
        profileImg : Text;
        threadIds : [Text];
        createdAt : Text;
        updatedAt : ?Text;
    };

    public type PostId = Text;

    public type PostReq = {
        postName : Text;
        postMetaData : Text;
    };
    public type PostInfo = {
        postId : PostId;
        postName : Text;
        postMetaData : Text;
        createdBy : Principal;
        replies : Trie.Trie<PostId, PostInfo>;
        createdAt : Text;
        updatedAt : ?Text;
    };

    public type Message = Text;
    public type Result_1<V> = {
        data : ?V;
        status : Bool;
        error : ?Text;
    };
    public type Result = Result.Result<Message, (Error.ErrorCode, Text)>;
};
