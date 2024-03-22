import { AuthClient } from "@dfinity/auth-client";
import React, { createContext, useContext, useEffect, useState } from "react";
// import { createActor } from "../../../../../declarations/IcpAccelerator_backend/index";
import { createActor } from "../../../../../declarations/backend";
import { Actor, HttpAgent } from "@dfinity/agent";
import { useDispatch } from "react-redux";
import { setActor } from "../Redux/Reducers/actorBindReducer";
import {
  loginSuccess,
  logoutSuccess,
  logoutFailure
} from "../Redux/Reducers/InternetIdentityReducer";

const AuthContext = createContext();

// const plugWalletHandler = async () => {
//   console.log(window)
//   if (window?.ic?.plug) {
//     try {
//       // Request connection to the user's Plug Wallet.
//       await window.ic.plug.requestConnect();
//       const isConnected = await window.ic.plug.isConnected();
//       if (isConnected) {
//         console.log("Plug Wallet is connected!");
//   console.log(window)


//         // Ensure the Plug agent is available for use.
//         if (!window.ic.plug.agent) {
//           await window.ic.plug.createAgent();
//         }

//         // Obtain the principal from the Plug agent and do something with it.
//         const principal = await window.ic.plug.agent.getPrincipal();
//         const principalText = principal.toText();
//         console.log("Plug principal", principalText);

//         // Here you could dispatch an action or update some state.
//         // For example, this might be dispatching an action to Redux.
//         // dispatch(walletHandler({ principalText: principalText, WalletType: "plug" }));
//       }
//     } catch (error) {
//       console.error("Error connecting to Plug Wallet:", error);
//     }
//   } else {
//     alert("Plug Wallet extension is not installed!");
//   }
// };

const plugWalletHandler = async () => {
  // let ic : any , plug: any; 
  // console.log(window)
  // console.log(ic)
  // console.log("plug" , plug)


  if (window?.ic?.plug) {
    try {
      // Request connection to the user's Plug Wallet.
      await window.ic.plug.requestConnect();
      const isConnected = await window.ic.plug.isConnected();
      if (isConnected) {
        console.log("Plug Wallet is connected!");

        // Ensure the Plug agent is available for use.
        if (!window.ic.plug.agent) {
          await window.ic.plug.createAgent();
        }

        // Obtain the principal from the Plug agent and do something with it.
        const principal = await window.ic.plug.agent.getPrincipal();
        const principalText = principal.toText();
        console.log("Plug principal", principalText);

        // Here you could dispatch an action or update some state.
        // For example, this might be dispatching an action to Redux.
        // dispatch(walletHandler({ principalText: principalText, WalletType: "plug" }));
      }
    } catch (error) {
      console.error("Error connecting to Plug Wallet:", error);
    }
  } else {
    alert("Plug Wallet extension is not installed!");
  }
};


const defaultOptions = {
  /**
   *  @type {import("@dfinity/auth-client").AuthClientCreateOptions}
   */
  createOptions: {
    // idleOptions: {
    //   // Set to true if you do not want idle functionality
    //   disableIdle: true,
    // },
    idleOptions: {
      idleTimeout: 1000 * 60 * 30, // set to 30 minutes
      disableDefaultIdleCallback: true, // disable the default reload behavior
    },
  },
  /**
   * @type {import("@dfinity/auth-client").AuthClientLoginOptions}
   */
  loginOptions: {
    identityProvider:
      process.env.DFX_NETWORK === "ic"
        ? "https://identity.ic0.app/#authorize"
        : `http://be2us-64aaa-aaaaa-qaabq-cai.localhost:4943/`,
        // :  plugWalletHandler() 

  },
  
};

/**
 *
 * @param options - Options for the AuthClient
 * @param {AuthClientCreateOptions} options.createOptions - Options for the AuthClient.create() method
 * @param {AuthClientLoginOptions} options.loginOptions - Options for the AuthClient.login() method
 * @returns
 */
export const useAuthClient = (options = defaultOptions) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authClient, setAuthClient] = useState(null);
  const [identity, setIdentity] = useState(null);
  const [principal, setPrincipal] = useState(null);
  const [backendActor, setBackendActor] = useState(null);

  const dispatch = useDispatch();
  useEffect(() => {
    AuthClient.create(options.createOptions).then((client) => {
      setAuthClient(client);
    });
  }, []);

  const login = () => {
    return new Promise(async (resolve, reject) => {
      try {
        if (
          authClient.isAuthenticated() &&
          (await authClient.getIdentity().getPrincipal().isAnonymous()) ===
            false
        ) {
          updateClient(authClient);
          resolve(AuthClient);
        } else {
          authClient.login({
            ...options.loginOptions,
            onError: (error) => reject(error),
            onSuccess: () => {
              updateClient(authClient);
              resolve(authClient);
            },
          });
        }
      } catch (error) {
        reject(error);
      }
    });
  };

  const reloadLogin = () => {
    return new Promise(async (resolve, reject) => {
      try {
        if (
          authClient.isAuthenticated() &&
          (await authClient.getIdentity().getPrincipal().isAnonymous()) ===
            false
        ) {
          updateClient(authClient);
          resolve(AuthClient);
        }
      } catch (error) {
        reject(error);
      }
    });
  };

  async function updateClient(client) {
    const isAuthenticated = await client.isAuthenticated();
    setIsAuthenticated(isAuthenticated);
   
    const identity = client.getIdentity();
    setIdentity(identity);
    const principal = identity.getPrincipal().toText();
    setPrincipal(principal);
    setAuthClient(client);
    const agent = new HttpAgent({ identity });
    const actor = createActor( process.env.CANISTER_ID_BACKEND, {
      agent,
    });
   
    console.log("actor in useauth -<<<<", actor);
    if (isAuthenticated === true) {
      dispatch(
        loginSuccess({
          isAuthenticated: true,
          identity,
          principal,
          navi: "roleSelect",
        })
      );
      dispatch(setActor(actor));
    }
    setBackendActor(actor);
  }

  async function logout() {
    try {
      await authClient?.logout();
      await updateClient(authClient);
      setIsAuthenticated(false);
      await dispatch(logoutSuccess());
    } catch (error) {
      dispatch(logoutFailure(error.toString()));
    }
  }

  // const canisterId =
  //   process.env.CANISTER_ID_ICPACCELERATOR_BACKEND ||
  //   process.env.ICPACCELERATOR_BACKEND_CANISTER_ID;

  const canisterId = process.env.CANISTER_ID_BACKEND

  const actor = createActor(canisterId, { agentOptions: { identity } });
  

  return {
    isAuthenticated,
    login,
    logout,
    updateClient,
    authClient,
    identity,
    principal,
    actor,
    reloadLogin,
  };
};

/**
 * @type {React.FC}
 */
export const AuthProvider = ({ children }) => {
  const auth = useAuthClient();
  if (auth.authClient && auth.actor) {
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
  } else {
    return null; 
  }
};

export const useAuth = () => useContext(AuthContext);

