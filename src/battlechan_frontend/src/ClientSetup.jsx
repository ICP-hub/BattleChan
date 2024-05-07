
import React from 'react';
import { createClient } from "@connect2ic/core";
import { InternetIdentity } from "@connect2ic/core/providers";
import { PlugWallet } from "@connect2ic/core/providers/plug-wallet";
import { Connect2ICProvider } from "@connect2ic/react";
import { backend, canisterId as backendCanisterID, idlFactory } from "../../declarations/backend/index";
import { ledger, canisterId as ledgerCanisterID, idlFactory as ledgeridlFactory } from "../../declarations/ledger/index";

const client = createClient({
    canisters: {
        backend: {
            canisterId: backendCanisterID,
            idlFactory: idlFactory
        },
        ledger: {
            canisterId: ledgerCanisterID,
            idlFactory: ledgeridlFactory
        },
    },
    providers: [new InternetIdentity(), new PlugWallet()],
});

client.on("connect", () => {
    // Connected
    console.log("connected");
    console.log(client.status);
    console.log("anonymousActors", client.anonymousActors);
})

console.log(client.actors);
console.log("status", client.status);
console.log("anonymousActors", client.anonymousActors);

const ClientSetup = ({ children }) => (
    <Connect2ICProvider client={client}>
        {children}
    </Connect2ICProvider>
);

export default ClientSetup;
