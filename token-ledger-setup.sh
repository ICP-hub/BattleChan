# This is for the local ledger setup not for the main net

# Create identities
dfx identity new minter --disable-encryption || true
dfx identity new reciever --disable-encryption || true
dfx identity new testing --disable-encryption || true

dfx identity use default

MINTER=$(dfx --identity minter identity get-principal)
DEFAULT=$(dfx --identity default identity get-principal)
RECIEVER=$(dfx --identity reciever identity get-principal)
TOKEN_SYMBOL=Time
TOKEN_NAME="time_token"
TRANSFER_FEE=100
PRE_MINTED_TOKENS=10000000000000

dfx deploy ledger --argument "(variant {Init = 
record {
     token_symbol = \"${TOKEN_SYMBOL}\";
     token_name = \"${TOKEN_NAME}\";
     minting_account = record { owner = principal \"${MINTER}\" };
     transfer_fee = ${TRANSFER_FEE};
     metadata = vec {};
     initial_balances = vec { record { record { owner = principal \"${DEFAULT}\"; }; ${PRE_MINTED_TOKENS}; }; };
     archive_options = record {
         num_blocks_to_archive = 1000000000;
         trigger_threshold = 1000000000;
         controller_id = principal \"${DEFAULT}\";
     };
     feature_flags = opt record {icrc2 = true;};
 }
})"

dfx deploy ledger --argument "(variant {Init = 
record {ting_account = record { owner = principal \"bd3sg-teaaa-aaaaa-qaaba-cai\" };
     token_symbol = \"Time\";
     token_name = \"time_token\";
     minting_account = record { owner = principal \"bd3sg-teaaa-aaaaa-qaaba-cai\" };u-xv6f4-to4ar-fgwuc-su6zz-jqcon-tk3vb-7ghim-aqe\"; }; 10000000; }; };
     transfer_fee = 100;ecord {
     metadata = vec {};archive = 1000000000;
     initial_balances = vec { record { record { owner = principal \"m4etk-jcqiv-42f7u-xv6f4-to4ar-fgwuc-su6zz-jqcon-tk3vb-7ghim-aqe\"; }; 10000000; }; };
     archive_options = record {pal \"m4etk-jcqiv-42f7u-xv6f4-to4ar-fgwuc-su6zz-jqcon-tk3vb-7ghim-aqe\";
         num_blocks_to_archive = 1000000000;
         trigger_threshold = 1000000000; true;};
         controller_id = principal \"m4etk-jcqiv-42f7u-xv6f4-to4ar-fgwuc-su6zz-jqcon-tk3vb-7ghim-aqe\";
     };
     feature_flags = opt record {icrc2 = true;};
 }