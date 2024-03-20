// import { takeLatest, call, put } from "redux-saga/effects";
// import {
  // triggerInternetIdentity,
  // walletHandler,
  // triggerPlugWallet,
  // triggeBitfinityWallet,
  // triggerAstroxMeWallet,
// } from "../Reducers/WalletAuth";
// import { AuthClient } from "@dfinity/auth-client";
// import { toHex } from "@dfinity/agent";
// import { initActor } from "../ActorManager";
// import { setActor } from "../Reducers/actorBindReducer";



// function* internetIdentityHandler() {
//   try {
//     const authClient = yield AuthClient.create();
//     yield new Promise((resolve) => {
//       authClient.login({
//         identityProvider:
//           process.env.DFX_NETWORK === "ic"
//             ? "https://identity.ic0.app"
//             : `http://rdmx6-jaaaa-aaaaa-aaadq-cai.localhost:4943`,
//         onSuccess: resolve,
//       });
//     });

//     const identity = authClient.getIdentity();
//     console.log('identity mai aya =>', identity)
//     const actor = yield initActor(identity);
//     yield put(setActor(actor));

//     const principal = identity.getPrincipal();
//     const principalText = principal.toText();

//     // Dispatch action to update the Redux state
//     yield put(
//       walletHandler({
//         principalText: principalText,
//         WalletType: "internetIdentity",
//       })
//     );
//   } catch (error) {
//     console.error("Error in internetIdentity:", error);
//   }
// }



// function* plugWalletHandler() {
  // if (window?.ic?.plug) {
  //   try {
  //     yield window.ic.plug.requestConnect();
  //     const isConnected = yield window.ic.plug.isConnected();
  //     if (isConnected) {
  //       console.log("Plug Wallet is connected!", isConnected);

  //       if (!window.ic.plug.agent) {
  //         yield window.ic.plug.createAgent();
  //       }
  //       // console.log("authClient kind of thing..", window.ic.plug.agent);
  //       // const publicKey = yield window.ic.plug.requestConnect();
  //       // let rawKeyHex = toHex(publicKey.rawKey.data);
  //       // console.log("this is rawKeyHex___________", rawKeyHex);toHex

  //       let principal = yield window.ic.plug.agent.getPrincipal();
  //       let principalText = principal.toText();
  //       // console.log("plug principalllll", principalText);
  //       yield put(
  //         walletHandler({
  //           principalText: principalText,
  //           WalletType: "plug",
  //         })
  //       );
  //       // onClose();
  //     }
  //   } catch (error) {
  //     console.error("Error connecting to Plug Wallet:", error);
  //   }
  // } else {
  //   alert("Plug Wallet extension is not installed!");
  // }
// }

// function* astroxMeWalletHandler() {
//   if (window?.ic?.astroxme) {
//     try {
//       yield window.ic.astroxme.requestConnect();

//       const isConnected = yield window.ic.astroxme.isConnected();
//       if (isConnected) {
//         console.log("AstroX ME is connected!");
//       }
//     } catch (error) {
//       console.error("Error connecting to AstroX ME:", error);
//     }
//   } else {
//     alert("AstroX ME extension is not installed!");
//   }
// }

// function* bitfinityWalletHandler() {
  // if (window?.ic?.infinityWallet) {
  //   try {
  //     const isConnected = yield window.ic.infinityWallet.requestConnect();
  //     if (isConnected) {
  //       const principal = yield window.ic.infinityWallet.getPrincipal();
  //       let principalText = principal.toText();
  //       // console.log("bitfinity principalllll", principalText);
  //       yield put(
  //         walletHandler({
  //           principalText: principalText,
  //           WalletType: "bitfinity",
  //         })
  //       );
  //       // console.log("Bitfinity Wallet is connected!", principal);
  //     } else {
  //       console.log("User declined the connection.");
  //     }
  //   } catch (error) {
  //     console.error("Error connecting to Bitfinity Wallet:", error);
  //   }
  // } else {
  //   alert("Bitfinity Wallet extension is not installed!");
  // }
// }

// export function* walletSagas() {
//   // yield takeLatest(triggerInternetIdentity().type, internetIdentityHandler),
//     yield takeLatest(triggerPlugWallet().type, plugWalletHandler);
//   // yield takeLatest(triggerAstroxMeWallet().type, astroxMeWalletHandler);
//   yield takeLatest(triggeBitfinityWallet().type, bitfinityWalletHandler);
// }
