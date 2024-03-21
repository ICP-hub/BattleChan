// import React, { Suspense, lazy, useState } from "react";
// import "./App.css";

// import { Connect2ICProvider } from "@connect2ic/react";
// import "./Connect2ic/Connect2ic.scss";

// import { createClient } from "@connect2ic/core";
// import { defaultProviders } from "@connect2ic/core/providers";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


// // Lazy load pages
// const Landing = lazy(() => import("./pages/Landing/Landing"));
// const DashboardRoutes = lazy(() => import("./pages/Routes"));

// import Loader from "./components/Loader/Loader";


// // interface LandingProps {
// //   darkColor: string;
// //   lightColor: string;
// //   handleThemeSwitch: () => void;
// // }




// function App() {
//   const [dark, setDark] = useState(true);
//   const [light, setLight] = useState(true);
//   const darkColor: string = dark ? "dark" : "light";
//   const lightColor: string = !dark ? "dark" : "light";

//   function handleThemeSwitch() {
//     setDark(!dark);
//     setLight(!light);
//   }
//   return (
//     <Router>
//       <div>
//         <Routes>
//           <Route
//             path="/"
//             element={
//               <Suspense fallback={<Loader />}>
//                 <Landing
//                   // darkColor={darkColor}
//                   // lightColor={lightColor}
//                   // handleThemeSwitch={handleThemeSwitch}
//                 />
//               </Suspense>
//             }
//           />
          

//           <Route
//             path="/dashboard/*"
//             element={
//               <Suspense fallback={<Loader />}>
//                 <DashboardRoutes
//                   // darkColor={darkColor} 
//                   // lightColor={lightColor}
//                 />
//               </Suspense>
//             }
//           />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// // const client = createClient({
// //   canisters: {},
// //   providers: defaultProviders,
// // });

// export default () => (
// //   <Connect2ICProvider client={client}>
    
//     <App />
// //    </Connect2ICProvider>
// );

// ------------------------ --------------




import React, { useState , useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import AppRoutes from "./AppRoutes.jsx"; 
// import ConnectWallet from "./models/ConnectWallet.jsx"
import { handleActorRequest } from "./components/StateManagement/Redux/Reducers/actorBindReducer.jsx";
import {useAuth} from "./components/StateManagement/useContext/useAuth.jsx"
import Landing from "./pages/Landing/Landing.tsx";
import DashBoard from "./pages/Dashboard/Dashboard.tsx";
import ConnectWallet from "./models/ConnectWallet.jsx";
import { checkLoginOnStart } from "./components/StateManagement/Redux/Reducers/InternetIdentityReducer";
import { userRegisteredHandlerRequest } from "./components/StateManagement/Redux/Reducers/userRegisteredData";
// --------------------

function App() {
  const [dark, setDark] = useState(true);

  function handleThemeSwitch() {
    setDark(!dark);
  }

  // const identity = useSelector((currState) => currState.internet.identity);
  // const isAuthenticated = useSelector(
  //   (currState) => currState.internet.isAuthenticated
  // );
  // const specificRole = useSelector(
  //   (currState) => currState.current.specificRole
  // );

  const { reloadLogin } = useAuth();

  const [isModalOpen, setModalOpen] = useState(false);

  const dispatch = useDispatch();


  useEffect(() => {
    reloadLogin();
  }, []);

  // useEffect(() => {
  //   if (isAuthenticated && identity) {
  //     dispatch(handleActorRequest());
  //   }
  // }, [isAuthenticated, identity, dispatch]);
  // useEffect(() => {
  //   if (isAuthenticated && identity) {
  //     dispatch(multiChainHandlerRequest());
  //   }
  // }, [isAuthenticated, identity, dispatch]);

  // useEffect(() => {
  //   dispatch(userRoleHandler());
  // }, [isAuthenticated, identity, dispatch]);

 
  // useEffect(() => {
  //   dispatch(userRegisteredHandlerRequest());
  // }, [isAuthenticated, dispatch]);

  return (
    <Router>
      <div>
        <ConnectWallet isModalOpen={isModalOpen} onClose={() => setModalOpen(false)} />

        <AppRoutes  setModalOpen={setModalOpen} />
      </div>
    </Router>
  );
}

// Assume the rest of the Connect2ICProvider setup remains the same if needed
export default App;
