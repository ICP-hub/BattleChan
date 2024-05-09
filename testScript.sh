 dfx canister call backend createUserAccount '(record {userName = "test" ; profileImg = "xyz"})'
 dfx canister call backend getUserInfo
 dfx canister call backend createNewBoard '("tester", "abxc")'
dfx canister call ledger icrc2_approve "(record {fee = opt 100 ; amount = 1000 ; spender = record {owner = principal \"unyfe-j35fx-d3ylb-fq37w-ride4-rxmub-xj4kr-emq2w-djeqx-4gsqu-6qe\"}})"
dfx canister call ledger icrc2_transfer_from "(record { from = record { owner = principal \"rzo6e-othar-as4dz-5dm3l-5mlxo-q7w3x-5ol3f-74pvr-s2mbw-vdigk-yae\"};fee =  opt 100 ; to = record { owner = principal \"bkyz2-fmaaa-aaaaa-qaaaq-cai\" }; amount = 103 })"
{expireTime = +1_714_633_264_570_858_480; posttoken = +92_193_472_381; tokenleft = +92_093_472_381}
{expireTime = +1_714_633_820_793_281_973; expireTime5 = +1_714_633_520_793_281_973; posttoken = +38_644_349_005; tokenleft = +1_714_633_482_148_932_968}



dfx  canister call ledger icrc1_transfer "(record { to = record { owner = principal \"z3psl-4r5mf-zkmpj-drzda-w562g-cu7c3-duyna-wsbjj-bf6gs-xkt6f-hae\" }; amount = 1000000000000000000000000 })" --network ic