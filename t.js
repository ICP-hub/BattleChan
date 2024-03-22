import * as React from "react";
import { useState } from "react";
import AstroXME from "../../assets/Images/WalletLogos/AstroXME.png"
import infinityWallet from "../../assets/Images/WalletLogos/infinityWallet.png"
import InternetIdentity from "../../assets/Images/WalletLogos/InternetIdentity.png"
import NFID from "../../assets/Images/WalletLogos/NFID.png"
import PlugWallet from "../../assets/Images/WalletLogos/PlugWallet.png"
import StoicWallet from "../../assets/Images/WalletLogos/StoicWallet.png"
import { AuthClient } from "@dfinity/auth-client";
import { useNavigate } from 'react-router-dom';
import { toHex } from "@dfinity/agent";
import axios from 'axios';
import { DDate_backend } from "../../../declarations/DDate_backend/index";
import { Principal } from "@dfinity/principal";


const WalletModal = ({ isOpen, onClose }) => {

  const navigate = useNavigate()

  const [userToken, setUserToken] = useState('');
  const [userPrincipal, setUserPrincipal] = useState('');

  console.log("tokan aaya after login", userToken);
  console.log("principal userPrincipal after login", userPrincipal);

  const onLogin = (token, principal) => {
    console.log("aha token set state vich jau ga", token);
    console.log("aha principal set state vich jau ga", principal);

    setUserToken(token);
    setUserPrincipal(principal);

    localStorage.setItem('userToken', token);
    localStorage.setItem('userPrincipal', principal);
   

  };

  // const [loader, setLoader] = useState(false);

  if (!isOpen) return null;

  // const navigateWithLoader = (path) => {
  //   setLoader(false);
  //   navigate(path);
  // };

  const existingUserHandler = async () => {
    const principalString = localStorage.getItem("id");

    if (principalString) {
      try {
        const newPrincipal = Principal.fromText(principalString);
        const userExist = await DDate_backend.get_profile(newPrincipal);
        const userPrincipalInString = userExist.id.toText();
        const principalToString = newPrincipal.toText();

        if (userPrincipalInString === principalToString) {
          navigate("/Swipe");
        } else {
          navigate("/CreateAccount1");
        }
      } catch (error) {
        console.error("Error checking user existence: ", error);
        // navigate("/CreateAccount1");
      }
    } else {
      navigate("/CreateAccount1");
    }
  };

  const InternetIdentityHandler = async () => {
    const authClient = await AuthClient.create();
    authClient.login({
      identityProvider: "https://identity.ic0.app/#authorize",
      onSuccess: async () => {
        const identity = authClient.getIdentity();
        const principal = identity.getPrincipal();
        let principalText = principal.toText();

        localStorage.setItem("id", principalText);
        // localStorage.setItem('wallet',JSON.stringify('InternetIdentity'))
        localStorage.setItem("identity", JSON.stringify(identity));
        await existingUserHandler();
        onClose();
      },
    });
  };


  const connectInfinityWallet = async () => {
    if (window?.ic?.infinityWallet) { // Replace with actual check for Infinity Wallet
      try {
        // Request connection to the user's Infinity Wallet
        // This is a placeholder and should be replaced with the actual method
        await window.ic.infinityWallet.requestConnect();

        const isConnected = await window.ic.infinityWallet.isConnected(); // Replace with actual method
        if (isConnected) {
          console.log("Infinity Wallet is connected!");
          // Handle successful connection here
          navigate('/CreateAccount1');
        }
      } catch (error) {
        console.error("Error connecting to Infinity Wallet:", error);
        // Handle connection error here
      }
    } else {
      alert("Infinity Wallet extension is not installed!");
    }
  };


  const connectStoicWallet = async () => {
    if (window?.ic?.stoic) {
      try {
        await window.ic.stoic.requestConnect();
        const isConnected = await window.ic.stoic.isConnected();
        if (isConnected) {
          console.log("Stoic Wallet is connected!");
        }
      } catch (error) {
        console.error("Error connecting to Stoic Wallet:", error);
      }
    } else {
      alert("Stoic Wallet extension is not installed!");
    }
  };

  // async function getSignatureWithData(authClient) {
  //   let principal = authClient.getPrincipal().toString();
  //   let encoder = new TextEncoder();
  //   let message = encoder.encode(principal);
  //   let signature = await authClient.getPrincipal().sign(message);
  //   let exportedKey = await crypto.subtle.exportKey('raw', authClient.getPrincipal()._inner._keyPair.publicKey);
  //   return {
  //     publicKey: toHex(exportedKey),
  //     signature: toHex(signature),
  //     principal: principal,
  //   }
  // }

  async function registerUser(principal, publicKey, signature) {
    console.log("inside register user!!")

    // Retrieve the necessary information from localStorage
    // const principal = localStorage.getItem('id');
    // const publicKey = localStorage.getItem('publicKey'); // Assuming you have stored it already
    // const signature = localStorage.getItem('signature'); // Assuming you have stored it already

    // Construct the API endpoint (if it's always localhost, you can hardcode it, otherwise, make it configurable)
    //const apiEndpoint = 'http://localhost:3000/api/v1/register/user';
    
    const apiEndpoint = 'https://ddate.kaifoundry.com/api/v1/register/user';
    // Construct the payload
    const payload = {
      principal,
      publicKey,
      signature
    };

    // Use fetch to make the API call
    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      // Check if the request was successful
      if (response.ok) {
        const data = await response.json();
        console.log('Registration successful:', data);

        handleLogin(principal, publicKey);

        // Handle successful registration (e.g., redirect to a login page or display a success message)
      } else {
        // If the server response was not ok, handle the error
        console.error('Registration failed:', response.status, response.statusText);
        // Handle error (e.g., display an error message to the user)
      }
    } catch (error) {
      // Handle network error
      console.error('Network error:', error);
      // Handle error (e.g., display an error message to the user)
    }
  }



  const handleLogin = async (principal, publicKey) => {
    try {
      // Replace with actual login API call
      const response = await axios.post('https://ddate.kaifoundry.com/api/v1/login/user', {
        principal: principal,
        publicKey: publicKey // Modify as needed
      });

      if (response.data.status) {
        onLogin(response.data.userToken, principal);
        console.log("login sucesssssss__ss");

        console.log("ls see token updated ja nhi befor local storage", userToken);
        console.log("ls see userPrincipal updated ja nhi befor local storage", userPrincipal);

        
      } else {
        console.log('Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };







  const connectPlugWallet = async () => {
    if (window?.ic?.plug) {
      try {
        await window.ic.plug.requestConnect();
        const isConnected = await window.ic.plug.isConnected();
        if (isConnected) {
          console.log("Plug Wallet is connected!");

          if (!window.ic.plug.agent) {
            await window.ic.plug.createAgent();
          }

          console.log("authClient kind of thing..", window.ic.plug.agent);

          const publicKey = await window.ic.plug.requestConnect();

          console.log("public key mil gyi", publicKey)
          console.log("public key mil gyi", publicKey)
          console.log("public key mil gyi", publicKey.rawKey.data)

          // 2.

          let rawKeyHex = toHex(publicKey.rawKey.data);

          console.log("this is rawKeyHex_____", rawKeyHex);



          // let data_received = getSignatureWithData(window.ic.plug.agent);
          // console.log("data received", data_received);


          let principal = await window.ic.plug.agent.getPrincipal();

          let principalText = principal.toText();

          //1. 3.
          console.log("id", principalText);
          
registerUser(principalText, rawKeyHex, principalText)
          
localStorage.setItem("id", principalText);

          await existingUserHandler();
          onClose();
        }
      } catch (error) {
        console.error("Error connecting to Plug Wallet:", error);
      }
    } else {
      alert("Plug Wallet extension is not installed!");
    }
  };

  const connectAstroXME = async () => {
    if (window?.ic?.astroxme) { // Replace with actual check for AstroX ME
      try {
        // Request connection to the user's AstroX ME
        // This is a placeholder and should be replaced with the actual method
        await window.ic.astroxme.requestConnect();

        const isConnected = await window.ic.astroxme.isConnected(); // Replace with actual method
        if (isConnected) {
          console.log("AstroX ME is connected!");
          // Handle successful connection here
          // Navigate or perform next actions
        }
      } catch (error) {
        console.error("Error connecting to AstroX ME:", error);
        // Handle connection error here
      }
    } else {
      alert("AstroX ME extension is not installed!");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-start z-50 pt-20" onClick={onClose}>
      <div className="relative w-full max-w-md p-5 m-3 rounded-lg shadow-lg bg-walletColor text-white" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-lg font-lg mb-4 text-center">Connect With</h3>
        <p className="border-t border-white w-full md:w-3/4 lg:w-2/3 mx-auto mb-4"></p>

        <ul className="space-y-3">
          {/* AstroX ME */}
          <li className="border border-gray-300 rounded-3xl flex items-center p-2 cursor-pointer transition-colors duration-300 ease-in-out  hover:bg-yellow-900 hover:border-yellow-500 active:bg-yellow-700 active:border-yellow-600">
            <img src={AstroXME} alt="AstroXME" className="rounded-full h-8 w-8 flex items-center justify-center text-white mr-2" />
            <span className="text-center flex-grow" onClick={connectAstroXME}>AstroX ME</span>
          </li>

          {/* Infinity Wallet */}
          <li className="border border-gray-300 rounded-3xl flex items-center p-2 cursor-pointer transition-colors duration-300 ease-in-out hover:bg-yellow-900 hover:border-yellow-500 active:bg-yellow-700 active:border-yellow-600">
            <img src={infinityWallet} alt="infinityWallet" className="rounded-full h-8 w-8 flex items-center justify-center text-white mr-2" />
            <span className="text-center flex-grow" onClick={connectInfinityWallet}>Infinity Wallet</span>
          </li>

          {/* NFID */}
          <li className="border border-gray-300 rounded-3xl flex items-center p-2 cursor-pointer transition-colors duration-300 ease-in-out hover:bg-yellow-900 hover:border-yellow-500 active:bg-yellow-700 active:border-yellow-600">
            <img src={NFID} alt="NFID" className="rounded-full h-8 w-8 flex items-center justify-center text-white mr-2" />
            <span className="text-center flex-grow">NFID</span>
          </li>

          {/* Plug Wallet */}

          <li className="border border-gray-300 rounded-3xl flex items-center p-2 cursor-pointer transition-colors duration-300 ease-in-out hover:bg-yellow-900 hover:border-yellow-500 active:bg-yellow-700 active:border-yellow-600">
            <img
              src={PlugWallet}
              alt="PlugWallet"
              className="rounded-full h-8 w-8 flex items-center justify-center text-white mr-2"
            />
            <span className="text-center flex-grow" onClick={connectPlugWallet}>
              Plug Wallet
            </span>
          </li>

          {/* Stoic Wallet */}
          <li className="border border-gray-300 rounded-3xl flex items-center p-2 cursor-pointer transition-colors duration-300 ease-in-out hover:bg-yellow-900 hover:border-yellow-500 active:bg-yellow-700 active:border-yellow-600">
            <img src={StoicWallet} alt="StoicWallet" className="rounded-full h-8 w-8 flex items-center justify-center text-white mr-2" />
            <span className="text-center flex-grow" onClick={connectStoicWallet}>Stoic Wallet</span>
          </li>

          {/* Internet Identity */}
          <li className="border border-gray-300 rounded-3xl flex items-center p-2 cursor-pointer transition-colors duration-300 ease-in-out hover:bg-yellow-900 hover:border-yellow-500 active:bg-yellow-700 active:border-yellow-600">
            <img src={InternetIdentity} alt="InternetIdentity" className="rounded-full h-8 w-8 flex items-center justify-center text-white mr-2" />
            <span className="text-center flex-grow" onClick={InternetIdentityHandler}>Internet Identity</span>
          </li>
        </ul>


      </div>
    </div>
  );
};

export default WalletModal;