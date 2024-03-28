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
     token_symbol = \"time\";
     token_name = \"time_token\";
     minting_account = record { owner = principal \"m4etk-jcqiv-42f7u-xv6f4-to4ar-fgwuc-su6zz-jqcon-tk3vb-7ghim-aqe\" };
     transfer_fee = 100;
     metadata = vec {};
     initial_balances = vec { record { record { owner = principal \"rzo6e-othar-as4dz-5dm3l-5mlxo-q7w3x-5ol3f-74pvr-s2mbw-vdigk-yae\"; }; 1000000 }; };
     archive_options = record {
         num_blocks_to_archive = 1000000000;
         trigger_threshold = 1000000000;
         controller_id = principal \"rzo6e-othar-as4dz-5dm3l-5mlxo-q7w3x-5ol3f-74pvr-s2mbw-vdigk-yae\";
     };
     feature_flags = opt record {icrc2 = true;};
 }
})"

dfx deploy ledger --argument "(variant {Init = 
record {
     token_symbol = \"Time\";
     token_name = \"time_token\";
     minting_account = record { owner = principal \"bkyz2-fmaaa-aaaaa-qaaaq-cai\" };
     transfer_fee = 100;
     metadata = vec {};
     initial_balances = vec { record { record { owner = principal \"rzo6e-othar-as4dz-5dm3l-5mlxo-q7w3x-5ol3f-74pvr-s2mbw-vdigk-yae\";  1000000000; }; };
     archive_options = record {
         num_blocks_to_archive = 1000000000;
         trigger_threshold = 1000000000;
         controller_id = principal \"rzo6e-othar-as4dz-5dm3l-5mlxo-q7w3x-5ol3f-74pvr-s2mbw-vdigk-yae\";
         };
     feature_flags = opt record {icrc2 = true;};
 }
})"