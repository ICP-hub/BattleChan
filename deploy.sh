principal=$(dfx identity get-principal --network ic)

echo "principal of command: $principal"


dfx deploy ledger --argument "(variant {Init = 
record {
     token_symbol = \"time\";
     token_name = \"time_token\";
     minting_account = record { owner = principal \"$principal\" };
     transfer_fee = 100;
     metadata = vec {};
     initial_balances = vec { record { record { owner = principal \"$principal\"; }; 1000000000000000000 }; };
     archive_options = record {
         num_blocks_to_archive = 1000000000;
         trigger_threshold = 1000000000;
         controller_id = principal \"$principal\";
     };
     feature_flags = opt record {icrc2 = true;};
 }
})"


dfx deploy backend

dfx deploy internet_identity

dfx deploy battlechan_frontend


dfx deploy ledger --argument "(variant {Init = 
record {
     token_symbol = \"time\";
     token_name = \"time_token\";
     minting_account = record { owner = principal \"$principal\" };
     transfer_fee = 100;
     metadata = vec {};
     initial_balances = vec { record { record { owner = principal \"$principal\"; }; 1000000000000000000 }; };
     archive_options = record {
         num_blocks_to_archive = 1000000000;
         trigger_threshold = 1000000000;
         controller_id = principal \"$principal\";
     };
     feature_flags = opt record {icrc2 = true;};
 }
})" --network ic

dfx deploy backend --network ic

dfx deploy internet_identity --network ic

dfx deploy battlechan_frontend --network ic



