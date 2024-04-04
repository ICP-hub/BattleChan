import { useCanister } from "@connect2ic/react";
import { useState } from "react";

// Custom hook : initialize the backend Canister
const useBackend = () => {
    return useCanister("backend");
};


const TokensApiHanlder = () => {
    // Init backend
    const [backend, canisterId] = useBackend();
    let backend_canister_id = canisterId.canisterDefinition.canisterId;

    // ICRC2 APPROVE
    const icrc2_approve = async (amount: number = 1) => {
        try {
            // Convert the amount to the desired format
            const formattedAmount: number = amount * Math.pow(10, 8);
            console.log(formattedAmount);
            const res = await backend.icrc2_approve(formattedAmount);
            console.log("balance: ", res);
            return res;
        } catch (err) {
            console.error("Error: ", err);
        }
    };

    // Returns
    return { icrc2_approve };
};

export default TokensApiHanlder;
