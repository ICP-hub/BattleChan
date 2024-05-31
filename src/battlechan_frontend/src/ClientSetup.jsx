
import React from 'react';
import { createClient } from "@connect2ic/core";
import { InternetIdentity, NFID } from "@connect2ic/core/providers";
import { Connect2ICProvider } from "@connect2ic/react";
import * as backend from "../../declarations/backend";
import * as ledger from "../../declarations/ledger";

const client = createClient({
    canisters: {
        backend,
        ledger
    },
    providers: [new InternetIdentity(), new NFID()],
    globalProviderConfig: {
        dev: import.meta.env.DEV,
    },
});

// console.log("Actors", client.actors);
console.log("status", client.status);
// console.log("anonymousActors", client.anonymousActors);

const ClientSetup = ({ children }) => (
    <Connect2ICProvider client={client}>
        {children}
    </Connect2ICProvider>
);

export default ClientSetup;
