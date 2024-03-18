set -e

function debug_print() {
    echo "State at checkpoint $1"
    echo "Balance of minter: $(dfx canister call ledger icrc1_balance_of "(record {owner = principal \"$(dfx --identity $MINTER_ID identity get-principal)\"})")"
    echo "Balance of approver: $(dfx canister call ledger icrc1_balance_of "(record {owner = principal \"$(dfx --identity $APPROVER_ID identity get-principal)\"})")"
    echo "Balance of transferrer: $(dfx canister call ledger icrc1_balance_of "(record {owner = principal \"$(dfx --identity $TRANSFERRER_ID identity get-principal)\"})")"
}

# dfx identity names
MINTER_ID=default
APPROVER_ID=participant-001
TRANSFERRER_ID=participant-002

# principals
MINTER_PRINCIPAL=$(dfx --identity default identity get-principal)
APPROVER_PRINCIPAL=$(dfx --identity participant-001 identity get-principal)
TRANSFERRER_PRINCIPAL=$(dfx --identity participant-002 identity get-principal)

debug_print 1

# mint cycles to APPROVER_ACCOUNT
dfx --identity $MINTER_ID canister call ledger icrc1_transfer "(record { to = record { owner = principal \"$APPROVER_PRINCIPAL\" }; amount = 1000000000 })"

debug_print 2

# approve
dfx --identity $APPROVER_ID canister call ledger icrc2_approve "(record { amount = 9999999999999999; spender = record { owner = principal \"$TRANSFERRER_PRINCIPAL\"} })"

debug_print 3
echo "Approved amount: $(dfx canister call ledger icrc2_allowance "(record {account = record { owner = principal \"$APPROVER_PRINCIPAL\"}; spender = record { owner = principal \"$TRANSFERRER_PRINCIPAL\"};})")"

# spend
dfx --identity $TRANSFERRER_ID canister call ledger icrc2_transfer_from "(record { from = record { owner = principal \"$APPROVER_PRINCIPAL\"}; to = record { owner = principal \"$TRANSFERRER_PRINCIPAL\" }; amount = 300000000 })"

debug_print 4
