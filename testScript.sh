 dfx canister call backend createUserAccount '(record {userName = "test" ; profileImg = "xyz"})'
 dfx canister call backend getUserInfo
 dfx canister call backend createNewBoard '("tester", "abxc")'
 dfx canister call backend createPost '("tester", record {postName = "Testpost"; postDes= "dfvvfv"; postMetaData:"tester"})'

 dfx canister call backend createNewBoard '("interCollge", "abxc")'
 dfx canister call backend createPost '("interCollge", record { postName = "Testpost"; postDes= "dfvvfv"; postMetaData="tester"})'
 
 dfx canister call backend createNewBoard '("metter", "abxc")'
 dfx canister call backend createPost '("metter", record {postName = "Testpost"; postDes= "dfvvfv"; postMetaData="tester"})'
 dfx canister call backend createNewBoard '("test", "abxc")'
 dfx canister call backend createPost '("test", record {postName = "Testpost"; postDes= "dfvvfv"; postMetaData="tester"})'
 dfx canister call backend createNewBoard '("testing", "abxc")'
 dfx canister call backend createPost '("testing", record {postName = "Testpost"; postDes= "dfvvfv"; postMetaData="tester"})'
 dfx canister call backend createNewBoard '("tes", "abxc")'
 dfx canister call backend createPost '("tes", record {postName = "Testpost"; postDes= "dfvvfv"; postMetaData="tester"})'