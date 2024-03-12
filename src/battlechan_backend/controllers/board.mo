import Text "mo:base/Text";
import Trie "mo:base/Trie";
import Int "mo:base/Int";
import { now } "mo:base/Time";
import { trap } "mo:base/Debug";
import { reject } "../utils/message";
import { checkText; anonymousCheck } "../utils/validations";

import Types "../utils/types";
module {
    public func createBoardInfo(userId : Principal, boardName : Text, boardDes : Text) : Types.BoardInfo {
        if (checkText(boardName, 50) == false or checkText(boardDes, 300) == false) {
            trap(reject.outBound);
        };
        if (anonymousCheck(userId) == true) {
            trap(reject.anonymous);
        };
        let newBoard : Types.BoardInfo = {
            boardName;
            boardDes;
            postIds = [];
            upvotedTo = [];
            downvotedTo = [];
            createdAt = Int.toText(now());
            updatedAt = null;
        };
    };

};
