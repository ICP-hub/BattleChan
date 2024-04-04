import Debug "mo:base/Debug";
import Principal "mo:base/Principal";
import Int "mo:base/Int";
import { now } "mo:base/Time";
import List "mo:base/List";
import Trie "mo:base/Trie";
import Text "mo:base/Text";
import Array "mo:base/Array";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
// thapa technical
// code step by step
// namaster javascript
import Types "../utils/types";
import { reject } "../utils/message";
import { anonymousCheck; checkText } "../utils/validations";
import { checkVote; increaseTime; decreaseTime } "../utils/helper";
import { principalKey; textKey } "../keys";
module {

    public func createPostInfo(boardId : Types.BoardName, postTime : Int, postId : Types.PostId, userId : Types.UserId, postReq : Types.PostReq, userTrieMap : Trie.Trie<Types.UserId, Types.UserInfo>, boardTrieMap : Trie.Trie<Types.BoardName, Types.BoardInfo>) : {
        updatedBoardInfo : Types.BoardInfo;
        updatedUserInfo : Types.UserInfo;
        newPost : Types.PostInfo;
    } {
        if (anonymousCheck(userId) == true) {
            Debug.trap(reject.anonymous);
        };

        if (checkText(postReq.postName, 100) == false) {
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

        let updatedUserInfo : Types.UserInfo = {
            userId = userInfo.userId;
            userName = userInfo.userName;
            profileImg = userInfo.profileImg;
            upvotedTo = userInfo.upvotedTo;
            downvotedTo = userInfo.downvotedTo;
            likedComments = userInfo.likedComments;
            createdComments = userInfo.createdComments;
            replyIds = userInfo.replyIds;
            postIds = List.toArray(List.push(boardId # "-" # postId, List.fromArray(userInfo.postIds)));
            createdAt = userInfo.createdAt;
            updatedAt = ?Int.toText(now());
        };
        let updatedExpireTime = increaseTime(postTime, now());
        let newPost : Types.PostInfo = {
            postId = postId;
            postName = postReq.postName;
            postDes = postReq.postDes;
            board = boardId;
            postMetaData = postReq.postMetaData;
            upvotedBy = [];
            downvotedBy = [];
            upvotes = 0;
            downvotes = 0;
            comments = Trie.empty<Types.CommentId, Types.CommentInfo>();
            createdBy = {
                ownerId = userId;
                userName = userInfo.userName;
                userProfile = userInfo.profileImg;
            };
            expireAt = updatedExpireTime;
            createdAt = Int.toText(now());
            updatedAt = null;
        };

        let updatedBoardInfo : Types.BoardInfo = {
            boardName = boardInfo.boardName;
            boardDes = boardInfo.boardDes;
            totalPosts = boardInfo.totalPosts +1;
            postIds = List.toArray(List.push(postId, List.fromArray(boardInfo.postIds)));
            createdAt = boardInfo.createdAt;
            updatedAt = ?Int.toText(now());
        };
        return {
            updatedBoardInfo;
            updatedUserInfo;
            newPost;
        };
    };

    public func updateVoteStatus(userId : Types.UserId, voteTime : Int, voteStatus : Types.VoteStatus, postId : Types.PostId, postTrieMap : Trie.Trie<Types.PostId, Types.PostInfo>, userTrieMap : Trie.Trie<Types.UserId, Types.UserInfo>) : async {
        updatedUserInfo : Types.UserInfo;
        updatedPostInfo : Types.PostInfo;
    } {
         if (anonymousCheck(userId) == true) {
             Debug.trap(reject.anonymous);
         };

         if (anonymousCheck(userId) == true) {
            Debug.trap(reject.anonymous);
        };
        let userInfo : Types.UserInfo = switch (Trie.get(userTrieMap, principalKey userId, Principal.equal)) {
            case (?value) { value };
            case (null) { Debug.trap(reject.noAccount) };
        };
        let postInfo : Types.PostInfo = switch (Trie.get(postTrieMap, textKey postId, Text.equal)) {
            case (?value) { value };
            case (null) { Debug.trap(reject.noPost) };
        };
        switch (Array.find<Types.PostId>(userInfo.upvotedTo, func x = x == postId)) {
            case (?value) { Debug.trap(reject.alreadyVoted) };
            case (null) {};
        };

        switch (Array.find<Types.PostId>(userInfo.downvotedTo, func x = x == postId)) {
            case (?value) { Debug.trap(reject.alreadyVoted) };
            case (null) {};
        };

        switch (voteStatus) {
            case (#upvote) {
                let updatedExpireTime = increaseTime(voteTime, postInfo.expireAt);
                return {
                    updatedUserInfo : Types.UserInfo = {
                        userId = userInfo.userId;
                        userName = userInfo.userName;
                        profileImg = userInfo.profileImg;
                        upvotedTo = List.toArray(List.push(postId, List.fromArray(userInfo.upvotedTo)));
                        downvotedTo = userInfo.downvotedTo;
                        likedComments = userInfo.likedComments;
                        createdComments = userInfo.createdComments;
                        replyIds = userInfo.replyIds;
                        postIds = userInfo.postIds;
                        createdAt = userInfo.createdAt;
                        updatedAt = ?Int.toText(now());
                    };
                    updatedPostInfo : Types.PostInfo = {
                        postId = postInfo.postId;
                        postName = postInfo.postName;
                        postDes = postInfo.postDes;
                        board = postInfo.board;
                        upvotedBy = List.toArray(List.push(userId, List.fromArray(postInfo.upvotedBy)));
                        downvotedBy = postInfo.downvotedBy;
                        upvotes = postInfo.upvotes + 1;
                        downvotes = postInfo.downvotes;
                        postMetaData = postInfo.postMetaData;
                        createdBy = postInfo.createdBy;
                        comments = postInfo.comments;
                        expireAt = updatedExpireTime;
                        createdAt = postInfo.createdAt;
                        updatedAt = ?Int.toText(now());

                    };
                };
            };
            case (#downvote) {
                let updateExpireTime = decreaseTime(voteTime, postInfo.expireAt);
                if (decreaseTime(voteTime, postInfo.expireAt) < 0) {
                    Debug.trap(reject.downvoteNotAllowed);
                };
                return {
                    updatedUserInfo : Types.UserInfo = {
                        userId = userInfo.userId;
                        userName = userInfo.userName;
                        profileImg = userInfo.profileImg;
                        upvotedTo = userInfo.upvotedTo;
                        downvotedTo = List.toArray(List.push(postId, List.fromArray(userInfo.upvotedTo)));
                        likedComments = userInfo.likedComments;
                        createdComments = userInfo.createdComments;
                        replyIds = userInfo.replyIds;
                        postIds = userInfo.postIds;
                        createdAt = userInfo.createdAt;
                        updatedAt = ?Int.toText(now());
                    };

                    updatedPostInfo : Types.PostInfo = {
                        postId = postInfo.postId;
                        postName = postInfo.postName;
                        postDes = postInfo.postDes;
                        board = postInfo.board;
                        upvotedBy = postInfo.upvotedBy;
                        downvotedBy = List.toArray(List.push(userId, List.fromArray(postInfo.downvotedBy)));
                        upvotes = postInfo.upvotes;
                        downvotes = postInfo.downvotes + 1;
                        postMetaData = postInfo.postMetaData;
                        createdBy = postInfo.createdBy;
                        comments = postInfo.comments;
                        expireAt = updateExpireTime;
                        createdAt = postInfo.createdAt;
                        updatedAt = ?Int.toText(now());
                    };
                };
            };
        };

    };

    public func updatePostExpireTime(time : Nat, postId : Types.PostId, postTrieMap : Trie.Trie<Types.PostId, Types.PostInfo>) : Trie.Trie<Types.PostId, Types.PostInfo> {

        // if (anonymousCheck(userId) == true) {
        //     Debug.trap(reject.anonymous);
        // };
        let postInfo : Types.PostInfo = switch (Trie.get(postTrieMap, textKey postId, Text.equal)) {
            case (?v) { v };
            case (null) { Debug.trap(reject.noPost) };
        };

        let updatedExpireTime = increaseTime(time, postInfo.expireAt);
        let updatedPostInfo : Types.PostInfo = {
            postId = postInfo.postId;
            postName = postInfo.postName;
            postDes = postInfo.postDes;
            upvotedBy = postInfo.upvotedBy;
            board = postInfo.board;
            downvotedBy = postInfo.downvotedBy;
            upvotes = postInfo.upvotes;
            downvotes = postInfo.downvotes;
            postMetaData = postInfo.postMetaData;
            createdBy = postInfo.createdBy;
            comments = postInfo.comments;
            expireAt = updatedExpireTime;
            createdAt = postInfo.createdAt;
            updatedAt = ?Int.toText(now());
        };
        return Trie.put(postTrieMap, textKey postId, Text.equal, updatedPostInfo).0;
    };

    public func postArchive(postId : Types.PostId, boardTrieMap : Trie.Trie<Types.BoardName, Types.BoardInfo>, userTrieMap : Trie.Trie<Types.UserId, Types.UserInfo>, postTrieMap : Trie.Trie<Types.PostId, Types.PostInfo>, userAchivedPostTrie : Trie.Trie<Types.UserId, List.List<(Types.PostId, Types.PostInfo)>>) : {
        updatedUserTrie : Trie.Trie<Types.UserId, Types.UserInfo>;
        updatedPostTrie : Trie.Trie<Types.PostId, Types.PostInfo>;
        updatedArchivedTrie : Trie.Trie<Types.UserId, List.List<(Types.PostId, Types.PostInfo)>>;
        updateBoardTrie : Trie.Trie<Types.BoardName, Types.BoardInfo>;
    } {

        let postInfo : Types.PostInfo = switch (Trie.get(postTrieMap, textKey postId, Text.equal)) {
            case (?value) { value };
            case (null) { Debug.trap(reject.noPost) };
        };
        let boardId = postInfo.board;

        let boardInfo : Types.BoardInfo = switch (Trie.get(boardTrieMap, textKey boardId, Text.equal)) {
            case (?r) { r };
            case (null) { Debug.trap(reject.invalidBoard) };
        };

        let userId = postInfo.createdBy.ownerId;
        let userInfo : Types.UserInfo = switch (Trie.get(userTrieMap, principalKey userId, Principal.equal)) {
            case (?value) { value };
            case (null) { Debug.trap(reject.noAccount) };
        };
        if (now() < postInfo.expireAt) {
            Debug.trap(reject.expireNotAllowed);
        };
        let updatedBoardInfo : Types.BoardInfo = {
            boardName = boardInfo.boardName;
            boardDes = boardInfo.boardDes;
            postIds = Array.filter<Types.PostId>(boardInfo.postIds, func x = x != postId);
            totalPosts = boardInfo.totalPosts;
            createdAt = boardInfo.createdAt;
            updatedAt = ?Int.toText(now());
        };
        let updatedPostIds = Array.filter<Types.PostId>(userInfo.postIds, func x = x != postId);
        let updateUserInfo : Types.UserInfo = {
            userId = userInfo.userId;
            userName = userInfo.userName;
            profileImg = userInfo.profileImg;
            upvotedTo = userInfo.upvotedTo;
            downvotedTo = userInfo.downvotedTo;
            likedComments = userInfo.likedComments;
            createdComments = userInfo.createdComments;
            replyIds = userInfo.replyIds;
            postIds = updatedPostIds;
            createdAt = userInfo.createdAt;
            updatedAt = ?Int.toText(now());
        };

        var achivedPostList : List.List<(Types.PostId, Types.PostInfo)> = List.nil<(Types.PostId, Types.PostInfo)>();

        switch (Trie.get(userAchivedPostTrie, principalKey userId, Principal.equal)) {
            case (?value) {
                let tempList = List.push((postId, postInfo), value);
                achivedPostList := tempList;
            };
            case (null) {
                achivedPostList := List.push((postId, postInfo), achivedPostList);
            };
        };

        let updatedUserTrie : Trie.Trie<Types.UserId, Types.UserInfo> = Trie.put(userTrieMap, principalKey userId, Principal.equal, updateUserInfo).0;
        let updatedPostTrie : Trie.Trie<Types.PostId, Types.PostInfo> = Trie.remove(postTrieMap, textKey postId, Text.equal).0;
        let updatedArchivedTrie : Trie.Trie<Types.UserId, List.List<(Types.PostId, Types.PostInfo)>> = Trie.put(userAchivedPostTrie, principalKey userId, Principal.equal, achivedPostList).0;
        let updateBoardTrie : Trie.Trie<Types.BoardName, Types.BoardInfo> = Trie.put(boardTrieMap, textKey boardId, Text.equal, updatedBoardInfo).0;
        return {
            updatedUserTrie;
            updatedPostTrie;
            updatedArchivedTrie;
            updateBoardTrie;
        };
    };

    public func withdraw(postId : Types.PostId, amount : Nat, userId : Types.UserId, postTrie : Trie.Trie<Types.PostId, Types.PostInfo>, withdrawPostTrie : Trie.Trie<Types.PostId, List.List<(Types.UserId, Nat)>>) {

        let postInfo : Types.PostInfo = switch (Trie.get(postTrie, textKey postId, Text.equal)) {
            case (?value) { value };
            case (null) { Debug.trap(reject.noPost) };
        };
        if (postInfo.createdBy.ownerId != userId) {
            Debug.trap(reject.noAccess);
        };

        let tokenLeft = (postInfo.expireAt - 5 * 60_000_000_000) - now();
        let totalCommentersRewardInTime = (25 * tokenLeft) / 100;

        if (tokenLeft < 60_000_000_000) {
            Debug.trap(reject.oneMinLeft);
        };

        var rewardSeakersList : List.List<(Types.UserId, Nat)> = List.nil<(Types.UserId, Nat)>();
        let commentData : [Types.CommentInfo] = Trie.toArray<Types.CommentId, Types.CommentInfo, Types.CommentInfo>(postInfo.comments, func(k, v) = v);
        for (comment in commentData.vals()) {
            if (comment.likedBy.size() > 5) {
                rewardSeakersList := List.push((comment.createdBy.ownerId, comment.likedBy.size()), rewardSeakersList);
            };
        };

    };
    public func bubbleSortPost(arr : [var Types.PostRes], filterOptions : Types.FilterOptions) : [var Types.PostRes] {
        var n = arr.size();
        var temp : Types.PostRes = {
            postId = "";
            postName = "";
            postDes = "";
            upvotedBy = [];
            downvotedBy = [];
            board = "";
            upvotes = 0;
            downvotes = 0;
            postMetaData = [];
            createdBy = {
                ownerId = Principal.fromText("2vxsx-fae");
                userName = "";
                userProfile = [];
            };
            expireAt = 0;
            createdAt = "";
            updatedAt = ?"";
        };
        for (i in Iter.range(0, n - 2)) {
            switch (filterOptions) {
                case (#upvote) {
                    for (j in Iter.range(0, n - i - 2)) {
                        if (arr[j].upvotes < arr[j + 1].upvotes) {
                            // Swap elements if they are in the wrong order
                            temp := arr[j];
                            arr[j] := arr[j + 1];
                            arr[j + 1] := temp;
                        };
                    };
                };
                case (#downvote) {
                    for (j in Iter.range(0, n - i - 2)) {
                        if (arr[j].downvotes < arr[j + 1].downvotes) {
                            // Swap elements if they are in the wrong order
                            temp := arr[j];
                            arr[j] := arr[j + 1];
                            arr[j + 1] := temp;
                        };
                    };
                };
                case (#recent) {
                    for (j in Iter.range(0, n - i - 2)) {
                        if (arr[j].createdAt < arr[j + 1].createdAt) {
                            // Swap elements if they are in the wrong order
                            temp := arr[j];
                            arr[j] := arr[j + 1];
                            arr[j + 1] := temp;
                        };
                    };
                };
            };

        };
        return arr;
    };

};
