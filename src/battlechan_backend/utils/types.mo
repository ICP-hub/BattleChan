import Result "mo:base/Result";
import Principal "mo:base/Principal";
import Trie "mo:base/Trie";
import Error "mo:base/Error";
import Nat64 "mo:base/Nat64";
import List "mo:base/List";

module {
    public type Key<K> = Trie.Key<K>;
    public type UserId = Principal;
    public type UserReq = {
        userName : Text;
        profileImg : [Int8];
    };
    public type VoteStatus = {
        #upvote;
        #downvote;
    };
    public type UserTrieMap = Trie.Trie<UserId, UserInfo>;
    public type BoardTrieMap = Trie.Trie<BoardName, BoardInfo>;
    public type PostTrieMap = Trie.Trie<PostId, PostInfo>;
    public type WithdrawTrieMap = Trie.Trie<PostId, List.List<WithdrawRecord>>;
    public type BoardName = Text;
    public type CommentId = Text;
    public type BoardInfo = {
        boardName : Text;
        boardDes : Text;
        postIds : [PostId];
        totalPosts : Nat;
        createdAt : Text;
        updatedAt : ?Text;
    };

    public type UserInfo = {
        userId : UserId;
        userName : Text;
        profileImg : [Int8];
        upvotedTo : [PostId];
        downvotedTo : [PostId];
        likedComments : [CommentId];
        createdComments : [CommentId];
        replyIds : [(CommentId, ReplyId)];
        postIds : [Text];
        createdAt : Text;
        updatedAt : ?Text;
    };

    public type PostId = Text;

    public type PostReq = {
        postName : Text;
        postDes : Text;
        postMetaData : [Int8];
    };
    public type ReplyId = Text;
    public type ReplyInfo = {
        replyId : Text;
        reply : Text;
        likedBy : [UserId];
        dislikedBy : [UserId];
        createdBy : {
            ownerId : Principal;
            userName : Text;
            userProfile : [Int8];
        };
        createdAt : Text;
        updatedAt : ?Text;
    };
    public type CommentInfo = {
        commentId : Text;
        comment : Text;
        createdBy : {
            ownerId : Principal;
            userName : Text;
            userProfile : [Int8];
        };
        likedBy : [UserId];
        dislikedBy : [UserId];
        replies : Trie.Trie<ReplyId, ReplyInfo>;
        createdAt : Text;
        updatedAt : ?Text;
    };
    public type CommentRes = {
        commentId : Text;
        comment : Text;
        likedBy : [UserId];
        replies : [(ReplyId, ReplyInfo)];
        createdAt : Text;
        updatedAt : ?Text;
    };
    public type PostInfo = {
        postId : PostId;
        postName : Text;
        postDes : Text;
        upvotedBy : [UserId];
        board : Text;
        downvotedBy : [UserId];
        upvotes : Nat64;
        downvotes : Nat64;
        postMetaData : [Int8];
        createdBy : {
            ownerId : Principal;
            userName : Text;
            userProfile : [Int8];
        };
        comments : Trie.Trie<CommentId, CommentInfo>;
        createdAt : Int;
        expireAt : Int;
        updatedAt : ?Text;
    };
    public type CommentRewards = {
        likes : Nat;
        amount : Int;
        claimedStatus : Bool;
    };
    public type WithdrawRecord = {
        postId : PostId;
        commentersReward : Trie.Trie<UserId, CommentRewards>;
        ownerId : UserId;
        ownerReward : Int;
        createdAt : Text;
    };
    public type PostSearch = {
        postId : PostId;
        postName : Text;
    };
    public type PostRes = {
        postId : PostId;
        postName : Text;
        postDes : Text;
        upvotedBy : [UserId];
        board : Text;
        downvotedBy : [UserId];
        upvotes : Nat64;
        downvotes : Nat64;
        postMetaData : [Int8];
        createdBy : {
            ownerId : Principal;
            userName : Text;
            userProfile : [Int8];
        };
        createdAt : Int;
        expireAt : Int;
        updatedAt : ?Text;
    };
    public type FilterOptions = {
        #upvote;
        #downvote;
        #recent;
    };
    public type Message = Text;
    public type Result_1<V> = {
        data : ?V;
        status : Bool;
        error : ?Text;
    };
    public type Result = Result.Result<Message, (Error.ErrorCode, Text)>;

};
