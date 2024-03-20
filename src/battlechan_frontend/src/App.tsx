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

import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./AppRoutes.jsx"; // Ensure this path is correct
import ConnectWallet from "./models/ConnectWallet.jsx"


function App() {
  const [dark, setDark] = useState(true);

  function handleThemeSwitch() {
    setDark(!dark);
  }
  const [isModalOpen, setModalOpen] = useState(false);


  return (
    <Router>
      <div>

        {/* <ConnectWallet isModalOpen={isModalOpen} onClose={() => setModalOpen(false)} /> */}
        <AppRoutes />
      </div>
    </Router>
  );
}

// Assume the rest of the Connect2ICProvider setup remains the same if needed
export default App;
