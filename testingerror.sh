dfx identity use  harshitmain

# dfx  canister call ledger icrc1_transfer "(record { to = record { owner = principal \"lluc5-44xyz-p5ywp-apwa4-a6kpy-wyq4x-equjo-xires-2h3e2-lfnkl-3ae\" }; amount = 1000000000000000000 })" 
# dfx  canister call ledger icrc1_transfer "(record { to = record { owner = principal \"lebve-ee3za-txcur-xbw36-ujg7l-gpofb-x6onu-cuxxs-kx2fx-mlklc-bqe\" }; amount = 10000000000000000000 })" 
# dfx  canister call ledger icrc1_transfer "(record { to = record { owner = principal \"rpsq3-vwkyw-cif6l-ky6ym-c6wyy-vxprl-c6jjy-57ghw-ulrmy-binxl-yqe\" }; amount = 100000000000000000 })" 


# dfx canister call backend createUserAccount '(record {userName = "test" ; profileImg = vec {12; 34; 56}})'
dfx canister call backend getUserInfo
# dfx canister call backend createNewBoard '("tester", "abxc")'
# 
# dfx canister call backend createPost '("tester", record {postName = "postName"; postDes = "postDescription"; postMetaData = vec {12; 34; 56}})'
# dfx canister call backend getAllPosts


dfx canister call backend getPostInfo '("#2636435882")'


dfx identity use minter 
dfx canister call backend createUserAccount '(record {userName = "test" ; profileImg = vec {12; 34; 56}})'
dfx canister call backend getUserInfo
dfx canister call ledger icrc2_approve "(record {fee = opt 100 ; amount = 10000000000 ; spender = record {owner = principal \"be2us-64aaa-aaaaa-qaabq-cai\"}})"
dfx canister call backend upvoteOrDownvotePost '("#2636435882", variant { upvote  })'
dfx canister call backend getPostInfo '("#2636435882")'


dfx identity use  testing
dfx canister call backend createUserAccount '(record {userName = "test" ; profileImg = vec {12; 34; 56}})'
dfx canister call backend getUserInfo
dfx canister call ledger icrc2_approve "(record {fee = opt 100 ; amount = 10000000000 ; spender = record {owner = principal \"be2us-64aaa-aaaaa-qaabq-cai\"}})"
dfx canister call backend upvoteOrDownvotePost '("#2636435882", variant { upvote  })'
dfx canister call backend getPostInfo '("#2636435882")'


dfx identity use  reciever
dfx canister call backend createUserAccount '(record {userName = "test" ; profileImg = vec {12; 34; 56}})'
dfx canister call backend getUserInfo
dfx canister call ledger icrc2_approve "(record {fee = opt 100 ; amount = 10000000000 ; spender = record {owner = principal \"be2us-64aaa-aaaaa-qaabq-cai\"}})"
dfx canister call backend upvoteOrDownvotePost '("#2636435882", variant { upvote  })'
dfx canister call backend getPostInfo '("#2636435882")'





dfx identity use  harshitmain

dfx canister call backend withdrawPost '("#2636435882",1)'


dfx canister call backend getPostInfo '("#2636435882")'


dfx canister call backend postFilter '(variant {upvote}, 1,10 , "tester")'


# dfx canister call backend createComment '("#2636435882","sample")';

# # dfx canister call backend createUserAccount '(record {userName = "test" ; profileImg = vec {12; 34; 56}})'
# dfx identity use  harshitmain
# # dfx canister call ledger icrc2_approve "(record {fee = opt 100 ; amount = 10000000000 ; spender = record {owner = principal \"lebve-ee3za-txcur-xbw36-ujg7l-gpofb-x6onu-cuxxs-kx2fx-mlklc-bqe\"}})"
# dfx  canister call ledger icrc1_transfer "(record { to = record { owner = principal \"lebve-ee3za-txcur-xbw36-ujg7l-gpofb-x6onu-cuxxs-kx2fx-mlklc-bqe\" }; amount = 10000000000000000000 })" 
# dfx identity use  testing
# dfx canister call backend getUserInfo
# dfx canister call ledger icrc2_approve "(record {fee = opt 100 ; amount = 10000000000 ; spender = record {owner = principal \"be2us-64aaa-aaaaa-qaabq-cai\"}})"
# dfx canister call backend upvoteOrDownvotePost '("#2636435882", variant { upvote  })'
# dfx canister call backend getPostInfo '("#2636435882")'



# dfx canister call ledger icrc2_approve "(record {fee = opt 100 ; amount = 1000 ; spender = record {owner = principal \"lebve-ee3za-txcur-xbw36-ujg7l-gpofb-x6onu-cuxxs-kx2fx-mlklc-bqe\"}})"
# dfx identity use  receiver
# dfx canister call backend createUserAccount '(record {userName = "test" ; profileImg = vec {12; 34; 56}})'
# dfx canister call backend getUserInfo
# dfx canister call backend upvoteOrDownvotePost '("#2636435882", variant { upvote  })'
# dfx canister call backend getPostInfo '("#2636435882")'
