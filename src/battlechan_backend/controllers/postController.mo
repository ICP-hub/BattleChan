import Debug "mo:base/Debug";
import Principal "mo:base/Principal";
import Int "mo:base/Int";
import { now } "mo:base/Time";
import List "mo:base/List";
import Trie "mo:base/Trie";
import Text "mo:base/Text";
import Nat32 "mo:base/Nat32";

// thapa technical
// code step by step
// namaster javascript
import Types "../utils/types";
import { reject } "../utils/message";
import { anonymousCheck; checkText } "../utils/validations";
import { getUniqueId } "../utils/helper";
import { principalKey; textKey } "../keys";
module {
    public func createThreadInfo(boardId : Types.BoardName, userId : Types.UserId, postReq : Types.PostReq, userTrieMap : Trie.Trie<Types.UserId, Types.UserInfo>, boardTrieMap : Trie.Trie<Types.BoardName, Types.BoardInfo>) : {
        updatedBoardInfo : Types.BoardInfo;
        updatedUserInfo : Types.UserInfo;
    } {
        if (anonymousCheck(userId) == true) {
            Debug.trap(reject.anonymous);
        };

        if (checkText(postReq.postName, 50) == false) {
            Debug.trap(reject.noAccount);
        };

        let userInfo : Types.UserInfo = switch (Trie.get(userTrieMap, principalKey userId, Principal.equal)) {
            case (?value) { value };
            case (null) { Debug.trap(reject.noAccount) };
        };
        let boardInfo : Types.BoardInfo = switch (Trie.get(boardTrieMap, textKey boardId, Text.equal)) {
            case (?board) { board };
            case (null) { Debug.trap(reject.invalidBoard) };
        };

        let threadId : Types.PostId = Nat32.toText(getUniqueId());

        let updatedUserInfo : Types.UserInfo = {
            userId = userInfo.userId;
            userName = userInfo.userName;
            profileImg = userInfo.profileImg;
            threadIds = List.toArray(List.push(boardId # "#" # threadId, List.fromArray(userInfo.threadIds)));
            createdAt = userInfo.createdAt;
            updatedAt = ?Int.toText(now());
        };

        let newPost : Types.PostInfo = {
            postId = threadId;
            postName = postReq.postName;
            postMetaData = postReq.postMetaData;
            replies = Trie.empty<Types.PostId, Types.PostInfo>();
            createdBy = userId;
            createdAt = Int.toText(now());
            updatedAt = null;
        };

        let updatedBoardInfo : Types.BoardInfo = {
            boardName = boardInfo.boardName;
            boardDes = boardInfo.boardDes;
            posts = Trie.put(boardInfo.posts, textKey threadId, Text.equal, newPost).0;
            createdAt = boardInfo.createdAt;
            updatedAt = ?Int.toText(now());
        };

        return {
            updatedBoardInfo;
            updatedUserInfo;
        };
    };
};
