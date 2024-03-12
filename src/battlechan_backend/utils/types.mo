import Result "mo:base/Result";
import Principal "mo:base/Principal";
import Trie "mo:base/Trie";
import Error "mo:base/Error";
import Nat64 "mo:base/Nat64";

module {
    public type Key<K> = Trie.Key<K>;
    public type UserId = Principal;
    public type UserReq = {
        userName : Text;
        profileImg : Text;
    };
    public type VoteStatus = {
        #upvote;
        #downvote;
    };
    public type BoardName = Text;
    public type CommentId = Text;
    public type BoardInfo = {
        boardName : Text;
        boardDes : Text;
        postIds : [PostId];
        createdAt : Text;
        updatedAt : ?Text;
    };

    public type UserInfo = {
        userId : UserId;
        userName : Text;
        profileImg : Text;
        upvotedTo : [PostId];
        downvotedTo : [PostId];
        likedComments : [CommentId];
        replyIds : [(CommentId, ReplyId)];
        postIds : [Text];
        createdAt : Text;
        updatedAt : ?Text;
    };

    public type PostId = Text;

    public type PostReq = {
        postName : Text;
        postMetaData : Text;
    };
    public type ReplyId = Text;
    public type ReplyInfo = {
        replyId : Text;
        reply : Text;
        likes : Nat64;
        createdAt : Text;
        updatedAt : ?Text;
    };
    public type CommentInfo = {
        commentId : Text;
        comment : Text;
        likedBy : [UserId];
        replies : Trie.Trie<ReplyId, ReplyInfo>;
        createdAt : Text;
        updatedAt : ?Text;
    };
    public type PostInfo = {
        postId : PostId;
        postName : Text;
        upvotedBy : [UserId];
        downvotedBy : [UserId];
        upvotes : Nat64;
        downvotes : Nat64;
        postMetaData : Text;
        createdBy : Principal;
        comments : Trie.Trie<CommentId, CommentInfo>;
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
