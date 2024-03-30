// ClientSetup.jsx
import React from 'react';
import { createClient } from "@connect2ic/core";
import { InternetIdentity } from "@connect2ic/core/providers";
import { PlugWallet } from "@connect2ic/core/providers";
import { Connect2ICProvider } from "@connect2ic/react";
import { backend, canisterId, idlFactory } from "../../declarations/backend/index";

const client = createClient({
    canisters: {
        backend: {
          canisterId: canisterId,
          idlFactory: idlFactory
        }
    },
    providers: [new InternetIdentity(), new PlugWallet()],
});
// console.log("client", client);
const ClientSetup = ({ children }) => (
    <Connect2ICProvider client={client}>
        {children}
    </Connect2ICProvider>
);

export default ClientSetup;
