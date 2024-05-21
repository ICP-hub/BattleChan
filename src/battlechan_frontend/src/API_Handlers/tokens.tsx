import { useCanister } from "@connect2ic/react";
import { Principal } from "@dfinity/principal";


const useBackend = () => {
    return useCanister("backend");
};
const useLedger = () => {
    return useCanister("ledger");
};

interface BackendResponse {
    ok: string;
    Ok: string;
    err: {
        [key: string]: string;
    };
}

interface icrc1Response {
    ok: string;
    Ok: string;
    err: {
        [key: string]: string;
    };
}

interface Response {
    status: boolean;
    err: string;
}

const TokensApiHanlder = () => {

    const [backend, canisterId] = useBackend();
    const [ledger] = useLedger();


    const icrc2_approve = async (principal: string, amount: number = 1) => {
        let result = { status: false, err: "" } as Response;
        try {

            const is_sufficient_balance = await getBalance(principal || "");

            let balance = is_sufficient_balance;

            let fees = 100;
            let owner = Principal.fromText(canisterId.canisterDefinition.canisterId);
            let amnt = Number(amount * Math.pow(10, 8)) + Number(fees);
            // const expirationTime = Date.now() + (5 * 60 * 1000); 
            // const expiresAt: bigint = BigInt(expirationTime);
            balance = (Number(balance) * Math.pow(10, 8));
            console.log("balance", balance);
            console.log("amnt", amnt);
            if (balance >= amnt) {

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

                const res = (await ledger.icrc2_approve(data)) as BackendResponse;
                console.log("ICRC2", res);
                if (res && (res?.Ok || res?.ok)) {
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

                return result;
            }
        } catch (err) {
            result.status = false;
            result.err = "Error: Something went wrong, Please try again later!";
            console.error("Error: ", err);
            return result;
        }
    };


    const getBalance = async (principal: string) => {
        try {

            const argument = {
                owner: Principal.fromText(principal),
                subaccount: []
            };
            const res = await ledger.icrc1_balance_of(argument);

            let balance = (Number(res) / Math.pow(10, 8));
            return balance;
        } catch (err) {
            console.error("Error: ", err);
        }
    };


    const withdrawPost = async (postId: string, amount: number) => {
        let result = { status: false, err: "" } as Response;
        try {
            let intAmount = parseInt(amount.toString());

            console.log("postId", postId);
            console.log("withdraw amntInteger", intAmount);
            const res = (await backend.withdrawPost(postId, intAmount)) as BackendResponse;
            console.log("withdraw res", res);

            if (res && (res?.ok || res?.Ok)) {
                result.status = true;
            } else {
                result.status = false;
                const lastIndex = res?.err[1].lastIndexOf(":");
                const errorMsg = res?.err[1].slice(lastIndex + 2);
                result.err = errorMsg;
            }
            return result;
        } catch (err) {
            if (err instanceof Error) {
                result.status = false;
                const lastIndex = err.message.lastIndexOf(":");
                const errorMsg = err.message.slice(lastIndex + 2);
                result.err = errorMsg;
                return result;
            } else {
                result.status = false;
                result.err = "Error: Something went wrong, Please try again later!";
                console.error("Error: ", err);
                return result;
            }
        }
    };

    const icrc1_transfer = async (principal_id: string, amount: number) => {
        let result = { status: false, err: "" } as Response;
        try {
            // dfx  canister call ledger icrc1_transfer "(record { to = record { owner = principal \"vvrwv-pyvar-koyv5-jqnpq-4lea4-gc5x3-f64nm-n67xc-jvewm-urdpj-nqe\" }; amount = 1000000000000000000 })"
            let amnt = Number(amount * Math.pow(10, 8));
            let owner = Principal.fromText(principal_id);
            let fees = 0;
            let obj = {
                fee: [fees],
                memo: [],
                from_subaccount: [],
                created_at_time: [],
                to: {
                    owner: owner,
                    subaccount: []
                },
                amount: amnt
            }
            console.log("principal_id", principal_id);
            console.log("amnt", amnt);
            const res = (await ledger.icrc1_transfer(obj)) as icrc1Response;
            console.log("ledger res", res);

            if (res && (res?.ok || res?.Ok)) {
                result.status = true;
            } else {
                result.status = false;
                const lastIndex = res?.err[1].lastIndexOf(":");
                const errorMsg = res?.err[1].slice(lastIndex + 2);
                result.err = errorMsg;
            }
            return result;
        } catch (err) {
            if (err instanceof Error) {
                result.status = false;
                const lastIndex = err.message.lastIndexOf(":");
                const errorMsg = err.message.slice(lastIndex + 2);
                result.err = errorMsg;
                return result;
            } else {
                result.status = false;
                result.err = "Error: Something went wrong, Please try again later!";
                console.error("Error: ", err);
                return result;
            }
        }
    };


    return { getBalance, icrc2_approve, withdrawPost, icrc1_transfer };
};

export default TokensApiHanlder;
