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

interface BackendResponse {
    ok: string;
    err: {
        [key: string]: string;
    };
}

interface Response {
    status: boolean;
    err: string;
}

const TokensApiHanlder = () => {
    // Init backend
    const [backend, canisterId] = useBackend();
    // let backend_canister_id = canisterId.canisterDefinition.canisterId;
    const [ledger] = useLedger();
    const { principal, isConnected } = useConnect();
    // console.log(ledger);
    // // ICRC2 APPROVE
    const icrc2_approve = async (principal: string, amount: number = 1) => {
        let result = { status: false, err: "" } as Response;
        try {
            // console.log(principal);
            const is_sufficient_balance = await getBalance(principal || "");
            // console.log(is_sufficient_balance);
            const balance = is_sufficient_balance;
            // console.log(Number(balance));
            let fees = 100;
            let owner = Principal.fromText(canisterId.canisterDefinition.canisterId);
            let amnt = Number(amount * Math.pow(10, 8)) + Number(fees);
            const expirationTime = Date.now() + (5 * 60 * 1000); // Add 5 minutes in milliseconds
            const expiresAt: bigint = BigInt(expirationTime);

            if (Number(balance) >= amnt) {
                console.log("Approve");
                let data = {
                    fee: [fees],
                    memo: [],
                    from_subaccount: [],
                    created_at_time: [],
                    amount: amnt,
                    expected_allowance: [],
                    expires_at: [expiresAt],
                    spender: {
                        owner: owner,
                        subaccount: []
                    }
                }
                console.log(data);
                const res = (await ledger.icrc2_approve(data)) as BackendResponse;
                // console.log("icrc2_approve: ", res);
                if(res && res?.ok){
                    result.status = true;
                } else {
                    result.status = false;
                    const lastIndex = res?.err[1].lastIndexOf(":");
                    const errorMsg = res?.err[1].slice(lastIndex + 2);
                    result.err = errorMsg;
                }
                return result;
            } else {
                result.status = false;
                result.err = "Insufficient Balance!"
                console.log("Reject");
                return result;
            }
        } catch (err) {
            result.status = false;
            result.err = "Error: Something went wrong, Please try again later!";
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
            let balance = (Number(res) / Math.pow(10, 8));
            return balance;
        } catch (err) {
            console.error("Error: ", err);
        }
    };

    // Returns
    return { getBalance, icrc2_approve };
};

export default TokensApiHanlder;
