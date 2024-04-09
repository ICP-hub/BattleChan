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
    const [backend, canisterId] = useBackend();
    // let backend_canister_id = canisterId.canisterDefinition.canisterId;
    const [ledger] = useLedger();
    const { principal, isConnected } = useConnect();
    // console.log(ledger);
    // // ICRC2 APPROVE
    const icrc2_approve = async (amount: number = 1) => {
        try {
            const is_sufficient_balance = await getBalance(principal || "");
            const balance = 100000100n as bigint;
            console.log(Number(balance));
            let fees = 100;
            let owner = Principal.fromText(canisterId.canisterDefinition.canisterId);
            let amnt = Number(amount * Math.pow(10, 8)) + Number(fees);
            if (Number(is_sufficient_balance) >= amnt) {
                console.log("Approve");
                let data = {
                    fee: [fees],
                    memo: [],
                    from_subaccount: [],
                    created_at_time: [],
                    amount: amnt,
                    expected_allowance: [],
                    expires_at: [],
                    spender: {
                        owner: owner,
                        subaccount: []
                    }
                }
                console.log(data);
                const res = await ledger.icrc2_approve(data);
                console.log("icrc2_approve: ", res);
                return res;
            } else {
                console.log("Reject");
            }
        } catch (err) {
            console.error("Error: ", err);
        }
    };

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
    return { getBalance, icrc2_approve };
};

export default TokensApiHanlder;
