import Result "mo:base/Result";
import Principal "mo:base/Principal";
import Error "mo:base/Error";

module {
    public type UserId = Principal;
    public type UserReq = {
        userName : Text;
        profileImg : Text;
    };

    public type UserInfo = {
        userId : UserId;
        userName : Text;
        profileImg : Text;
        postIds : [Text];
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
