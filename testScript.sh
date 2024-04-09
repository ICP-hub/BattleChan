 dfx canister call backend createUserAccount '(record {userName = "test" ; profileImg = "xyz"})'
 dfx canister call backend getUserInfo
 dfx canister call backend createNewBoard '("tester", "abxc")'
dfx canister call ledger icrc2_approve "(record {fee = opt 100 ; amount = 1000 ; spender = record {owner = principal \"unyfe-j35fx-d3ylb-fq37w-ride4-rxmub-xj4kr-emq2w-djeqx-4gsqu-6qe\"}})"
dfx canister call ledger icrc2_transfer_from "(record { from = record { owner = principal \"rzo6e-othar-as4dz-5dm3l-5mlxo-q7w3x-5ol3f-74pvr-s2mbw-vdigk-yae\"};fee =  opt 100 ; to = record { owner = principal \"bkyz2-fmaaa-aaaaa-qaaaq-cai\" }; amount = 103 })"