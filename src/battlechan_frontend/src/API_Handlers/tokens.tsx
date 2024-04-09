import { useCanister } from "@connect2ic/react";
import { useState } from "react";
import { useConnect } from "@connect2ic/react";
import { Principal } from "@dfinity/principal";

// Custom hook : initialize the backend Canister
const useBackend = () => {
    return useCanister("backend");
};
const useLedger = () => {
    return useCanister("ledger");
};


const TokensApiHanlder = () => {
    // Init backend
    // const [backend, canisterId] = useBackend();
    // let backend_canister_id = canisterId.canisterDefinition.canisterId;
    const [ledger] = useLedger();
    const { principal, isConnected } = useConnect();
    // console.log(ledger);
    // // ICRC2 APPROVE
    // const icrc2_approve = async (amount: number = 1) => {
    //     try {
    //         // Convert the amount to the desired format
    //         const formattedAmount: number = amount * Math.pow(10, 8);
    //         console.log(formattedAmount);
    //         const res = await backend.icrc2_approve(formattedAmount);
    //         console.log("balance: ", res);
    //         return res;
    //     } catch (err) {
    //         console.error("Error: ", err);
    //     }
    // };

    const getBalance = async (principal: string) => {
        try {
            // console.log(principal);
            const argument = {
                owner: Principal.fromText(principal),
                subaccount: []
            };
            const res = await ledger.icrc1_balance_of(argument);
            // console.log("balance: ", res);
            return res;
        } catch (err) {
            console.error("Error: ", err);
        }
    };

    // Returns
    return { getBalance };
};

export default TokensApiHanlder;
