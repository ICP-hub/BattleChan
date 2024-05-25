
import React from 'react';
import { createClient } from "@connect2ic/core";
import { InternetIdentity, NFID, InfinityWallet } from "@connect2ic/core/providers";
import { Connect2ICProvider } from "@connect2ic/react";
import * as backend from "../../declarations/backend";
import * as ledger from "../../declarations/ledger";

const client = createClient({
    canisters: {
        backend,
        ledger
    },
    providers: [new InternetIdentity(), new NFID(), new InfinityWallet()],
    globalProviderConfig: {
        dev: import.meta.env.DEV,
    },
});

// client.on("connect", async () => {
//     // Connected
//     console.log("connected");
//     console.log("Actors", client.actors);
//     console.log(client.status);
//     console.log(client.principal);
//     console.log(client._service);
//     console.log(client.providers);
//     console.log(client.config);
//     console.log("anonymousActors", client.anonymousActors);
// })

// console.log("Actors", client.actors);
console.log("status", client.status);
// console.log("anonymousActors", client.anonymousActors);

const ClientSetup = ({ children }) => (
    <Connect2ICProvider client={client}>
        {children}
    </Connect2ICProvider>
);

export default ClientSetup;
