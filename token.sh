principal=$(dfx identity get-principal --network ic)

mintingprincipal=$(dfx canister call ledger icrc1_minting_account --network ic)