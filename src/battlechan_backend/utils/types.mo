import Result "mo:base/Result";
import Principal "mo:base/Principal";
import Error "mo:base/Error";

module {
    public type UserId = Principal;
    public type Message = Text;
    public type UserReq = {
        userName : Text;
        profileImg : Text;
    };

    public type UserInfo = {
        userId : UserId;
        userName : Text;
        profileImg : Text;
        postId : [Text];
        createdAt : Text;
        updatedAt : ?Text;
    };
    public type Result = Result.Result<Message, (Error.ErrorCode, Text)>;
};
