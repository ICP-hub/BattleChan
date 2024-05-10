dfx identity use default

# dfx  canister call ledger icrc1_transfer "(record { to = record { owner = principal \"hdyut-lwweb-zxdhi-le3sy-33e4m-qcavd-6dxiy-6egds-c32xp-5hxv4-zqe\" }; amount = 1000000000000000000 })" 
# dfx  canister call ledger icrc1_transfer "(record { to = record { owner = principal \"rf6gg-3mjl4-u3vuz-33b7o-dykbs-qjz4t-wy3kq-px2c7-tk7xx-lxxpe-qae\" }; amount = 1000000000000000000 })" 
# dfx  canister call ledger icrc1_transfer "(record { to = record { owner = principal \"x7qw2-df4r4-johlf-vxjss-f7hrr-tkpmo-ydjnr-qxe2h-hf4gn-q2bed-iae\" }; amount = 100000000000000000 })" 


# dfx canister call backend createUserAccount '(record {userName = "test" ; profileImg = vec {12; 34; 56}})'
# dfx canister call backend getUserInfo
# dfx canister call backend createNewBoard '("tester", "abxc")'
# 
# dfx canister call backend createPost '("tester", record {postName = "postName"; postDes = "postDescription"; postMetaData = vec {12; 34; 56}})'
# dfx canister call backend getAllPosts


dfx canister call backend getPostInfo '("#1935039877")'


dfx identity use minter 
dfx canister call backend createUserAccount '(record {userName = "test" ; profileImg = vec {12; 34; 56}})'
dfx canister call backend getUserInfo
dfx canister call ledger icrc2_approve "(record {fee = opt 100 ; amount = 10000000000 ; spender = record {owner = principal \"be2us-64aaa-aaaaa-qaabq-cai\"}})"
dfx canister call backend upvoteOrDownvotePost '("#1935039877", variant { upvote  })'
dfx canister call backend getPostInfo '("#1935039877")'


dfx identity use  testing
dfx canister call backend createUserAccount '(record {userName = "test" ; profileImg = vec {12; 34; 56}})'
dfx canister call backend getUserInfo
dfx canister call ledger icrc2_approve "(record {fee = opt 100 ; amount = 10000000000 ; spender = record {owner = principal \"be2us-64aaa-aaaaa-qaabq-cai\"}})"
dfx canister call backend upvoteOrDownvotePost '("#1935039877", variant { upvote  })'
dfx canister call backend getPostInfo '("#1935039877")'


dfx identity use  reciever
dfx canister call backend createUserAccount '(record {userName = "test" ; profileImg = vec {12; 34; 56}})'
dfx canister call backend getUserInfo
dfx canister call ledger icrc2_approve "(record {fee = opt 100 ; amount = 10000000000 ; spender = record {owner = principal \"be2us-64aaa-aaaaa-qaabq-cai\"}})"
dfx canister call backend upvoteOrDownvotePost '("#1935039877", variant { upvote  })'
dfx canister call backend getPostInfo '("#1935039877")'

dfx canister call backend createComment '("#1935039877","sample")';



dfx identity use default

dfx canister call backend withdrawPost '("#1935039877",1)'





# # dfx canister call backend createUserAccount '(record {userName = "test" ; profileImg = vec {12; 34; 56}})'
# dfx identity use  harshitmain
# # dfx canister call ledger icrc2_approve "(record {fee = opt 100 ; amount = 10000000000 ; spender = record {owner = principal \"lebve-ee3za-txcur-xbw36-ujg7l-gpofb-x6onu-cuxxs-kx2fx-mlklc-bqe\"}})"
# dfx  canister call ledger icrc1_transfer "(record { to = record { owner = principal \"lebve-ee3za-txcur-xbw36-ujg7l-gpofb-x6onu-cuxxs-kx2fx-mlklc-bqe\" }; amount = 10000000000000000000 })" 
# dfx identity use  testing
# dfx canister call backend getUserInfo
# dfx canister call ledger icrc2_approve "(record {fee = opt 100 ; amount = 10000000000 ; spender = record {owner = principal \"be2us-64aaa-aaaaa-qaabq-cai\"}})"
# dfx canister call backend upvoteOrDownvotePost '("#1935039877", variant { upvote  })'
# dfx canister call backend getPostInfo '("#1935039877")'



# dfx canister call ledger icrc2_approve "(record {fee = opt 100 ; amount = 1000 ; spender = record {owner = principal \"lebve-ee3za-txcur-xbw36-ujg7l-gpofb-x6onu-cuxxs-kx2fx-mlklc-bqe\"}})"
# dfx identity use  receiver
# dfx canister call backend createUserAccount '(record {userName = "test" ; profileImg = vec {12; 34; 56}})'
# dfx canister call backend getUserInfo
# dfx canister call backend upvoteOrDownvotePost '("#1935039877", variant { upvote  })'
# dfx canister call backend getPostInfo '("#1935039877")'
