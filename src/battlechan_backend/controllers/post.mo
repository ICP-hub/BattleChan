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
import Nat64 "mo:base/Nat64";
import Float "mo:base/Float";
import Types "../utils/types";
import { reject } "../utils/message";
import { anonymousCheck; checkText } "../utils/validations";
import { increaseTime; decreaseTime; textToInt } "../utils/helper";
import { principalKey; textKey } "../keys";
module {

    func getUserInfo(userId : Types.UserId, userTrieMap : Types.UserTrieMap) : Types.UserInfo {
        switch (Trie.get(userTrieMap, principalKey userId, Principal.equal)) {
            case (?value) { value };
            case (null) { Debug.trap(reject.noAccount) };
        };
    };
    func getPostInfo(postId : Types.PostId, postTrieMap : Types.PostTrieMap) : Types.PostInfo {
        switch (Trie.get(postTrieMap, textKey postId, Text.equal)) {
            case (?value) { value };
            case (null) { Debug.trap(reject.noPost) };
        };
    };

    public func createPostInfo(boardId : Types.BoardName, postTime : Int, postId : Types.PostId, userId : Types.UserId, postReq : Types.PostReq, userTrieMap : Types.UserTrieMap, boardTrieMap : Types.BoardTrieMap) : {
        updatedBoardInfo : Types.BoardInfo;
        updatedUserInfo : Types.UserInfo;
        newPost : Types.PostInfo;
    } {
        //if (anonymousCheck(userId) == true) {
        //    Debug.trap(reject.anonymous);
        //};

        if (checkText(postReq.postName, 100) == false) {
            Debug.trap(reject.noAccount);
        };

        let userInfo : Types.UserInfo = getUserInfo(userId, userTrieMap);
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

    public func updateVoteStatus(userId : Types.UserId, voteTime : Int, voteStatus : Types.VoteStatus, postId : Types.PostId, postTrieMap : Types.PostTrieMap, userTrieMap : Types.UserTrieMap) : async {
        updatedUserInfo : Types.UserInfo;
        updatedPostInfo : Types.PostInfo;
    } {
        //if (anonymousCheck(userId) == true) {
        //    Debug.trap(reject.anonymous);
        //};

        let userInfo : Types.UserInfo = getUserInfo(userId, userTrieMap);
        let postInfo : Types.PostInfo = getPostInfo(postId, postTrieMap);
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

    public func updatePostExpireTime(userId : Types.UserId, time : Nat, postId : Types.PostId, postTrieMap : Types.PostTrieMap) : Types.PostTrieMap {

        if (anonymousCheck(userId) == true) {
            Debug.trap(reject.anonymous);
        };

        let postInfo : Types.PostInfo = switch (Trie.get(postTrieMap, textKey postId, Text.equal)) {
            case (?v) { v };
            case (null) { Debug.trap(reject.noPost) };
        };
        if (userId != postInfo.createdBy.ownerId) {
            Debug.trap(reject.noAccess);
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

    public func postArchive(postId : Types.PostId, boardTrieMap : Types.BoardTrieMap, userTrieMap : Types.UserTrieMap, postTrieMap : Types.PostTrieMap, userAchivedPostTrie : Trie.Trie<Types.UserId, List.List<(Types.PostId, Types.PostInfo)>>) : {
        updatedUserTrie : Types.UserTrieMap;
        updatedPostTrie : Types.PostTrieMap;
        updatedArchivedTrie : Trie.Trie<Types.UserId, List.List<(Types.PostId, Types.PostInfo)>>;
        updateBoardTrie : Types.BoardTrieMap;
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
        let updatedPostIds = Array.filter<Types.PostId>(userInfo.postIds, func x = x != boardId # "-" # postId);
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

        let updatedUserTrie : Types.UserTrieMap = Trie.put(userTrieMap, principalKey userId, Principal.equal, updateUserInfo).0;
        let updatedPostTrie : Types.PostTrieMap = Trie.remove(postTrieMap, textKey postId, Text.equal).0;
        let updatedArchivedTrie : Trie.Trie<Types.UserId, List.List<(Types.PostId, Types.PostInfo)>> = Trie.put(userAchivedPostTrie, principalKey userId, Principal.equal, achivedPostList).0;
        let updateBoardTrie : Types.BoardTrieMap = Trie.put(boardTrieMap, textKey boardId, Text.equal, updatedBoardInfo).0;
        return {
            updatedUserTrie;
            updatedPostTrie;
            updatedArchivedTrie;
            updateBoardTrie;
        };
    };

    public func withdraw(postId : Types.PostId, amount : Nat, userId : Types.UserId, postTrieMap : Types.PostTrieMap, withdrawPostTrie : Types.WithdrawTrieMap) : {
        updatedPostTrie : Types.PostTrieMap;
        updatedWithDrawPostTrie : Types.WithdrawTrieMap;
        ownerReward : Nat;
    } {

        let postInfo : Types.PostInfo = getPostInfo(postId, postTrieMap);
        if (postInfo.createdBy.ownerId != userId) {
            Debug.trap(reject.noAccess);
        };

        let withDrawAmount : Nat = amount * 100_000_000;
        // let withDrawAmount = amount;
        Debug.print(Int.toText(withDrawAmount));

        // Initial free 30 minutes in nanoseconds
        let initialFreeTime : Int = 30 * 60 * 1_000_000_000;

        // Calculate the total post tokens based on the new rate: 1 $TIME token = 5 minutes
        let postToken = ((postInfo.expireAt - now() - initialFreeTime) / (5 * 60 * 1_000_000_000)) * 100_000_000;
        // Debug.print("Initial postToken: " # Int.toText(postToken));

        // Ensure that withdrawals can only happen if the visibility time is at least 5 minutes greater than 30 minutes
        if (postToken <= 0) {
            Debug.trap(reject.outOfToken);
        };

        // Ensure the withdraw amount does not dip below the 30-minute buffer
        let effectiveTokens = postToken * 100_000_000;
        // Debug.print("Effective tokens: " # Int.toText(effectiveTokens));

        if (withDrawAmount > effectiveTokens) {
            Debug.trap(reject.outOfToken);
        };

        let tokenLeft = postToken - withDrawAmount;
        // Debug.print("Token left after withdraw: " # Int.toText(tokenLeft));

        // Debug.print("total");
        // Debug.print(Int.toText(tokenLeft));

        // let totalCommentersReward = (25 * withDrawAmount) / 100;
        // Debug.print("total");
        // Debug.print(Int.toText(totalCommentersReward));

        // var ownerReward : Int = withDrawAmount - totalCommentersReward;

        // Calculate the reward to be sent to the owner (subtracting the total commenters' reward)
        // Calculate the reward to be sent to the commenters
        let totalCommentersReward : Nat = (withDrawAmount * 25_000_000) / 100_000_000;
        // Debug.print("withDrawAmount: " # Int.toText(withDrawAmount));
        // Debug.print("totalCommentersReward: " # Nat.toText(totalCommentersReward));
        var ownerReward : Nat = withDrawAmount - totalCommentersReward;

        // Debug.print("ownerReward");
        // Debug.print(Int.toText(ownerReward));

        // if (tokenLeft < 500_000_000) {
        //     Debug.trap(debug_show { postToken });
        // };

        var rewardSeakersTrie : Trie.Trie<Types.UserId, { postId : Types.PostId; likes : Nat; amount : Nat; claimedStatus : Bool }> = Trie.empty<Types.UserId, Types.CommentRewards>();
        let commentData : [Types.CommentInfo] = Trie.toArray<Types.CommentId, Types.CommentInfo, Types.CommentInfo>(postInfo.comments, func(k, v) = v);
        if (Array.size(commentData) == 0) {
            ownerReward := withDrawAmount;
        };
        var totalLikesOnComment = 0;
        for (comment in commentData.vals()) {
            if (comment.likedBy.size() > 1) {
                // Change to >= 5 for 5+ likes
                let ownerId = comment.createdBy.ownerId;
                totalLikesOnComment := totalLikesOnComment + comment.likedBy.size();
                rewardSeakersTrie := Trie.put(rewardSeakersTrie, principalKey ownerId, Principal.equal, { postId; likes = comment.likedBy.size(); amount = 0; claimedStatus = false }).0;
            };
        };

        let rewardSeakersArray = Trie.toArray<Types.UserId, Types.CommentRewards, (Types.UserId, Types.CommentRewards)>(rewardSeakersTrie, func(k, v) = (k, v));

        for (reward in rewardSeakersArray.vals()) {
            let ownerId = reward.0;
            let userLikes = reward.1.likes;
            let rewardAmountInPercent = (userLikes * 100) / totalLikesOnComment;
            // Debug.print("totalLikesOnComment: " # Int.toText(totalLikesOnComment));
            // Debug.print("rewardAmountInPercent: " # Int.toText(rewardAmountInPercent));
            // Debug.print("totalCommentersReward: " # Nat.toText(totalCommentersReward));
            let userRewardAmount : Nat = (rewardAmountInPercent * totalCommentersReward / 100);
            // Debug.print("(rewardAmountInPercent * totalCommentersReward): " # Nat.toText((rewardAmountInPercent * totalCommentersReward)));
            // Debug.print("(rewardAmountInPercent * totalCommentersReward) / 100: " # Nat.toText(userRewardAmount));
            // Debug.print("userRewardAmount: " # Nat.toText(userRewardAmount));
            rewardSeakersTrie := Trie.put(rewardSeakersTrie, principalKey ownerId, Principal.equal, { postId; likes = userLikes; amount = userRewardAmount; claimedStatus = false }).0;
        };
        let withdrawRecord : Types.WithdrawRecord = {
            postId;
            commentersReward = rewardSeakersTrie;
            ownerId = userId;
            ownerReward;
            createdAt = Int.toText(now());
        };
        Debug.print("expiredtime");
        Debug.print(Int.toText(postInfo.expireAt));
        Debug.print("currenttime");
        Debug.print(Int.toText(now()));

        // let updatedExpireTime = postInfo.expireAt - (withDrawAmount * 60_000_000_000);

        // Debugging step: print values before updating expire time
        // Debug.print("postInfo.expireAt: " # Int.toText(postInfo.expireAt));
        // Debug.print("withDrawAmount: " # Nat.toText(withDrawAmount));

        // Ensure the correct conversion factor (5 minutes per token in nanoseconds)
        // Convert the withDrawAmount from its native scale to the desired scale for 5 minutes each
        let scaledWithdrawAmount = withDrawAmount / 100_000_000; // Scaling down if withDrawAmount is in millions
        // Debug.print("Scaled withDrawAmount: " # Nat.toText(scaledWithdrawAmount));

        // Calculate the withdraw amount in nanoseconds
        let withdrawAmountInNanoseconds = scaledWithdrawAmount * 300_000_000_000; // 5 minutes in nanoseconds
        // Debug.print("withdrawAmountInNanoseconds: " # Int.toText(withdrawAmountInNanoseconds));

        // Update the expire time by subtracting the calculated nanoseconds
        let updatedExpireTime = postInfo.expireAt - withdrawAmountInNanoseconds;

        // Adjust the post visibility time reduction to 5 minutes per $TIME token
        // let updatedExpireTime = postInfo.expireAt - (withDrawAmount * 5 * 60_000_000_000);

        Debug.print("updatedexpiredtime");
        Debug.print(Int.toText(updatedExpireTime));
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
        let withdrawPostInfo : List.List<Types.WithdrawRecord> = switch (Trie.get(withdrawPostTrie, textKey postId, Text.equal)) {
            case (?value) { List.push(withdrawRecord, value) };
            case (null) {
                List.push(withdrawRecord, List.nil<Types.WithdrawRecord>());
            };
        };
        let updatedWithDrawPostTrie = Trie.put(withdrawPostTrie, textKey postId, Text.equal, withdrawPostInfo).0;
        let updatedPostTrie = Trie.put(postTrieMap, textKey postId, Text.equal, updatedPostInfo).0;
        // Debug.print("Initial postToken: " # Int.toText(postToken));
        // Debug.print("Effective tokens: " # Int.toText(effectiveTokens));
        // Debug.print("Withdraw amount: " # Int.toText(withDrawAmount));
        // Debug.print("Token left after withdraw: " # Int.toText(tokenLeft));
        // Debug.print("Owner reward: " # Nat.toText(ownerReward));

        let reward : Nat = switch (Nat.fromText(Nat.toText(ownerReward))) {
            case (null) { Debug.trap("No negative number") };
            case (?v) { v };
        };
        Debug.print("Final owner reward (Nat): " # Nat.toText(reward));
        // Debug.trap(debug_show ({ ownerReward }));
        {
            updatedPostTrie;
            updatedWithDrawPostTrie;
            ownerReward = reward;
        };
    };

    func checkReward(withdrawInfo : [Types.WithdrawRecord], userId : Principal) : ?{
        commenterReward : Types.CommentRewards;
        index : Nat;
    } {
        var index = 0;
        for (item in withdrawInfo.vals()) {

            switch (Trie.get(item.commentersReward, principalKey userId, Principal.equal)) {
                case (?value) {
                    return ?{ commenterReward = value; index };
                };
                case (null) {};

            };
            index := index +1;
        };

        return null

    };
    public func claim(userId : Types.UserId, postId : Types.PostId, userTrieMap : Types.UserTrieMap, withdrawPostTrie : Types.WithdrawTrieMap) : {
        updatedWithDrawPostTrie : Types.WithdrawTrieMap;
        amount : Nat;
    } {
        ignore getUserInfo(userId, userTrieMap);
        let withdrawInfo : [Types.WithdrawRecord] = switch (Trie.get(withdrawPostTrie, textKey postId, Text.equal)) {
            case (?value) { List.toArray(value) };
            case (null) { Debug.trap("Post hasn't been withdrawn yet!") };
        };
        let { commenterReward; index } = switch (checkReward(withdrawInfo, userId)) {
            case (?value) { value };
            case (null) { Debug.trap("No Reward found!") };
        };

        if (commenterReward.claimedStatus == true) {
            Debug.trap("Already claimed Rewards");
        };
        let rewardAmount = commenterReward.amount;
        let updatedCommentersReward : Types.CommentRewards = {
            postId = postId;
            likes = commenterReward.likes;
            amount = commenterReward.amount;
            claimedStatus = true;
        };
        let updatedCommentersRewardTrie = Trie.put(withdrawInfo[index].commentersReward, principalKey userId, Principal.equal, updatedCommentersReward).0;
        let updatedWithDrawPost : Types.WithdrawRecord = {
            commentersReward = updatedCommentersRewardTrie;
            createdAt = withdrawInfo[index].createdAt;
            ownerId = withdrawInfo[index].ownerId;
            ownerReward = withdrawInfo[index].ownerReward;
            postId = withdrawInfo[index].postId;
        };
        let deletedListOfWithDraw = List.fromArray(Array.filter<Types.WithdrawRecord>(withdrawInfo, func x = x != withdrawInfo[index]));
        let updatedListOfWithDraw = List.push(updatedWithDrawPost, deletedListOfWithDraw);
        let updatedWithDrawPostTrie = Trie.put(withdrawPostTrie, textKey postId, Text.equal, updatedListOfWithDraw).0;

        return {
            updatedWithDrawPostTrie;
            amount = rewardAmount;
        };

    };

    public func createTrieMapOfArchivedPost(userAchivedPostTrie : Trie.Trie<Types.UserId, List.List<(Types.PostId, Types.PostInfo)>>) : [(Types.PostId, Types.PostInfo)] {
        let archivedPostList : [List.List<(Types.PostId, Types.PostInfo)>] = Trie.toArray<Types.UserId, List.List<(Types.PostId, Types.PostInfo)>, List.List<(Types.PostId, Types.PostInfo)>>(userAchivedPostTrie, func(k, v) = v);
        var archivedPosts = List.nil<(Types.PostId, Types.PostInfo)>();
        for (item in archivedPostList.vals()) {
            archivedPosts := List.append<(Types.PostId, Types.PostInfo)>(archivedPosts, item);
        };
        List.toArray(archivedPosts);
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
                        if (Nat64.toText(arr[j].upvotes) < Nat64.toText(arr[j + 1].upvotes)) {
                            // Swap elements if they are in the wrong order
                            temp := arr[j];
                            arr[j] := arr[j + 1];
                            arr[j + 1] := temp;
                        };
                    };
                };
                case (#downvote) {
                    for (j in Iter.range(0, n - i - 2)) {
                        if (Nat64.toText(arr[j].downvotes) < Nat64.toText(arr[j + 1].downvotes)) {
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
