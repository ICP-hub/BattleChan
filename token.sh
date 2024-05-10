principal=$(dfx identity get-principal --network ic)

output=$(dfx canister call ledger icrc1_minting_account --network ic)

mintingprincipal=$(echo "$output" | grep -o 'principal "[^"]*"' | sed 's/principal "\(.*\)"/\1/')

if [ "$mintingprincipal" == "$principal" ]; then
    echo "You are allowed to give token"
    echo "Enter principal id to give token :"
    read tokenprincipal
    echo "Enter amount :"
    read amount
    dfx canister call ledger icrc1_transfer "(record { to = record { owner = principal \"$tokenprincipal\" }; amount = $amount })" --network ic

else
    echo "You are not allowed to give token"
fi
